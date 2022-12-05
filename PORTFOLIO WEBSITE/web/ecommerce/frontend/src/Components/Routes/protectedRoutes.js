import React, { Fragment } from 'react'
import { useSelector } from "react-redux"
import { Redirect, Route } from 'react-router-dom'
const ProtectedRoutes = ({ component: Component, ...rest }) => {
    const { loading, isAuthenticated } = useSelector(state => state.Authentication)

    return (

        <Fragment>
            {
                !loading && (
                    <Route {...rest}
                        render={(props) => {
                            if (isAuthenticated === false) {
                                return <Redirect to={"/Login"} />
                            }

                            return <Component {...props} />
                        }} />
                )
            }
        </Fragment>

    )
}

export default ProtectedRoutes