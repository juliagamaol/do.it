import React from 'react'
import { Redirect } from 'react-router-dom';

export default function Dashboard({authenticated}) {

    if (!authenticated) {
        return <Redirect to="/login" />;
    }
    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    )
}
