'use clients';

import { title } from "process";

export default function Header() {
    const navLinks = [
        { title: 'Home', path: '/home' },
        { title: 'About', path: '/about' }
    ];

    return (
        <>
            <nav>
                <ul>
                    {navLinks.map(item => {
                        return (<li>{item.title}</li>)
                    })}
                </ul>
            </nav>
        </>
    )

}