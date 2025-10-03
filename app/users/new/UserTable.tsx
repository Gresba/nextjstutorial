import Link from 'next/link';
import React from 'react'

import {sort} from 'fast-sort';

interface User {
    id: number;
    name: string;
    email: string;
}

interface Props {
    sortOrder: string
}

const UserTable = async ({ sortOrder } : Props) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users', 
        {
            // This will disabled caching
            cache: 'no-store'

            // This will keep data in cache for a certain amount of time
            // next: { revalidate: 10 }
        }
    );
    const users: User[] = await response.json();

    const sortedUsers = sort(users).asc(sortOrder === 'email' ? user => user.email : user => user.name);

    return (
        <table className='table table-bordered'>
            <thead>
                <tr>
                    <th>
                        <Link href="/users?sortOrder=name">Name</Link>
                    </th>
                    <th>
                        <Link href="/users?sortOrder=email">Email</Link>
                    </th>
                </tr>
            </thead>
            <tbody>
                {sortedUsers.map(user => (<tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    </tr>))}
            </tbody>
        </table>
  )
}

export default UserTable