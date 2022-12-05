// import ErrorHandler from "../utils/errorhandler.js";
import User from "../model/UserModel.js"
import bcrypt from "bcrypt"
import jsonwebtoken from "jsonwebtoken"
import ErrorHandler from "../utils/errorhandler.js";
import crypto from "crypto"
import sendEmail from "../utils/sendEmail.js";
import cloudinary from "cloudinary"

// //  😊😊  SignUp Form Started 😘😘


const RegisterUser = async (req, res, next) => {
    let { name, email, password } = req.body



    const file = req.files.avatar

    const myCloud = await cloudinary.v2.uploader.upload(file.tempFilePath, {
        folder: "Avatar",
        width: 150,
    })
        .then((result) => {
            console.log(result)
            secure_url = result.secure_url
            public_id = result.public_id
        }).catch((err) => {
            console.log(err, "//////////////")
        });

    const SALT_ROUND = 10
    await bcrypt.hash(password, SALT_ROUND, async (err, hash) => {
        if (err) {
            return (
                res.status(500).json({
                    msg: `🤬🤬🤬🤬🤬🤬 ${err} 🤬🤬🤬🤬🤬🤬`
                })
            )
        } else {
            const user = await User.create({
                name, email, password: hash,
                avatar: {
                    public_id: pid,
                    url: url,
                }
            }).then((result) => {
                res.status(201).json({
                    success: true,
                    email: result.email,
                    name: result.name,
                    avatar: result.avatar,
                    createdAt: result.createdAt,
                    message: "Login Successfull",
                    role: result.role,
                    message: "😲😲😲 Registeration Successful 😲😲😲 "
                })
            }).catch((err) => {
                if (err.name === "MongoServerError") {
                    return res.status(500).json({
                        message: "User All Ready Exist"
                    })
                }
                res.status(500).json({
                    message: err.message
                })
            });
        }
    })
}

// //  🙋🏻‍♀️🙋🏻‍♀️  SignUp Form Ended 🙋🏻‍♀️🙋🏻‍♀️

// 😝😝😝😝😝😝😝😝😝😝😝😝😝😝😝😝😝😝😝😝😝😝😝😝😝😝😝😝😝😝😝😝😝😝😝😝😝

// //  😊😊  SignIn Form Started 😘😘

const Login = async (req, res, next) => {
    let { email, password } = req.body

    if (!email || !password) {
        return (
            next(new ErrorHandler("Please Enter Email && Password !", 400))
        )
    }


    const userFound = await User.findOne({ email }).select("+password")
        .then(async (user) => {
            bcrypt.compare(password, user.password, (error, result) => {
                if (result) {
                    const token = jsonwebtoken.sign(
                        {
                            email,
                            name: user.name,
                            role: user.role,
                            id: user._id
                        },
                        process.env.ACCESS_TOKEN,
                        {
                            expiresIn: process.env.EXPIRES_IN
                        }
                    )

                    res.cookie('authToken', token, {
                        expires: new Date(
                            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
                        httpOnly: false,
                        maxAge: 120 * 60 * 60 * 1000,
                    })


                    res.status(200).json({
                        token,
                        email,
                        name: user.name,
                        avatar: user.avatar,
                        createdAt: user.createdAt,
                        message: "Login Successfull",
                        role: user.role,

                    })



                }
                if (!result) {
                    res.status(401).json({
                        msg: "😡👿Eamil or Password not matched 😡👿",
                    })
                }


            })
        }).catch(err => {
            res.status(400).json({
                message: err.message
            })
        })
}

// //  🙋🏻‍♀️🙋🏻‍♀️  SignIn Form Ended 🙋🏻‍♀️🙋🏻‍♀️



/////  Logout 

const Logout = async (req, res, next) => {
    res
        .clearCookie("authToken")
        .status(200)
        .json({ message: "Successfully logged out 😏 🍀" });
}





const ForgotPassword = async (req, res, next) => {


    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return next(new ErrorHandler("User Not Found", 404))
    }

    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false })

    const ResetPasswordUrl = `${req.protocol}://${"localhost:3000"}/user/resetPassword/${resetToken}`
    const message = `Your password reset url is :- \n\n ${ResetPasswordUrl}\n\n If you have not requested this Email, then please ignore it `;



    try {
        await sendEmail({
            email: user.email,
            subject: "Ecommerce Password Recovery Email",
            message
        })
        res.status(200).json({
            message: `Password Reset Email is sended to ${user.email} Successfully`
        })
    } catch (err) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false })
        return next(new ErrorResponse(err.message, 500))
    };







}


const ResetPassword = async (req, res, next) => {

    let resetPasswordToken = crypto.createHash("sha256")
        .update(req.params.token)
        .digest("hex")
    let resetPasswordExpire = { $gt: Date.now() }

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire
    })

    if (!user) {
        return next(new ErrorHandler(`Reset Password Token is invalid or it has been Expired ${user}`, 404))
    }

    if (!req.body.password) {
        return next(new ErrorHandler("Please Enter Password", 400))
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password doesnot match", 400))
    }

    if (req.body.password.length < 8) {
        return next(new ErrorHandler("Password doesnot be less than 8 character", 400))
    }

    const SALT_ROUND = 10

    bcrypt.hash(req.body.password, SALT_ROUND, async (err, hash) => {
        if (err) {
            return res.status(500).json({
                message: err
            })
        } else {
            await user.updateOne({
                resetPasswordToken: null,
                resetPasswordExpire: null,
                password: hash
            }).then((result) => {
                res.status(200).json({
                    message: "Password has been Change",
                    password: hash,
                    result,
                })
            }).catch((err) => {
                res.status(500).json({
                    err
                })
            });

        }
    })

}

////// Private  Get User Detail

const GetUserDetail = async (req, res, next) => {

    const user = await User.findById(req.user.id)
    res.status(200).json({
        success: true,
        user
    })

}


// update User password
const UpdatePassword = async (req, res, next) => {

    let { newPassword, confirmPassword } = req.body

    const user = await User.findById(req.user.id);

    if (!newPassword || !confirmPassword) {
        return next(new ErrorHandler("Enter newPassword , ConfirmPassword", 400));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("password does not match", 400));
    }

    const SALT_ROUND = 10

    await bcrypt.hash(req.body.newPassword, SALT_ROUND, async (err, hash) => {
        if (err) {
            return res.status(500).json({
                message: err
            })
        } else {
            await user.updateOne({
                password: hash
            })
            const token = jsonwebtoken.sign(
                {
                    email: user.email,
                    name: user.name,
                    role: user.role,
                    id: user._id
                },
                process.env.ACCESS_TOKEN,
                {
                    expiresIn: process.env.EXPIRES_IN
                }
            )
            res.status(200).cookie('authToken', token, {
                expires: new Date(
                    Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }).json({
                token,
                message: ` ${user.name} Your Password Is Changed And Successfully Login After Password Change`
            })



        }
    })



}








// // getAllUser Admin 

const GetAllUser = async (req, res, next) => {
    const user = await User.find()

    res.status(200).json({
        success: true,
        user
    })
}
// // GetSingleUser Admin 

const GetSingleUser = async (req, res, next) => {
    const user = await User.findById(req.params.id)

    if (!user) {
        return next(
            new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400)
        );
    }

    res.status(200).json({
        success: true,
        user,
    });
}

// // DeleteUser Admin 

const DeleteUser = async (req, res, next) => {

    const user = await User.findById(req.params.id)

    if (!user) {
        return next(
            new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400)
        );
    }

    await user.remove()

    res.status(200).json({
        success: true,
        message: "User is Successfully Deleted"
    });

}


// // Update Profile Authenticated User

const UpdateProfile = async (req, res, next) => {

    let { name, email } = req.body

    const userData = {
        name,
        email,
    }


    const user = await User.findByIdAndUpdate(req.user.id, userData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
    });

}




// // // UpdateUserRole  Admin Route
const UpdateUserRole = async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    };

    await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
    });
};




export {
    RegisterUser,
    Login,
    Logout,
    ForgotPassword,
    ResetPassword,
    GetUserDetail,
    UpdatePassword,
    GetAllUser,
    GetSingleUser,
    DeleteUser,
    UpdateProfile,
    UpdateUserRole
}