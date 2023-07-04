import React from "react"
import { Link } from "react-router-dom"

function UserProfile(props: any) {

    return (
        <h3>
            <Link to='/profile'>
                User: {props.username}
            </Link>
        </h3>
    )


}

export default UserProfile