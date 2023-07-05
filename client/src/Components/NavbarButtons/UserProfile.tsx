import React from "react"
import { Link } from "react-router-dom"

interface UserProps {
    username: string
}

function UserProfile(props: UserProps) {

    return (
        <h3>
            <Link to='/profile'>
                User: {props.username}
            </Link>
        </h3>
    )

}

export default UserProfile