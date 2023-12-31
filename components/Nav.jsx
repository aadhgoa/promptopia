"use client";

import Link from "next/link";
import Image from "next/image";

import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react"


const Nav = () => {

    const { data: session } = useSession();

    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);

    useEffect(() => {
        const fetchProviders = async () => {
            const response = await getProviders();
            setProviders(response);
        }

        fetchProviders();
    }, [])

    return (
        <nav className="flex-between w-full mb-16 pt-3">
            <Link href="/" className="flex gap-2 flex-center">
                <Image
                    src="/assets/images/logo.svg"
                    width={30}
                    height={30}
                    alt="Promptopia Logo"
                />

                <p className="logo_text">Promptopia</p>
            </Link>

            <div className="sm:flex hidden">
                {
                    session?.user ? (
                        <div className="flex gap-3 md:gap-5">
                            <Link
                                href="/share-prompt"
                                className="black_btn">
                                Share Prompt
                            </Link>
                            <button
                                type="button"
                                onClick={signOut}
                                className="outline_btn"
                            >
                                Sign Out
                            </button>

                            <Link href="/profile">
                                <Image
                                    src={session?.user?.image}
                                    width={37}
                                    height={37}
                                    className="rounded-full"
                                    alt="Profile"
                                />
                            </Link>

                        </div>
                    ) : (
                        <>
                            {providers && Object.values(providers).map((provider) => (
                                <button
                                    type="button"
                                    key={provider.name}
                                    onClick={() => signIn(provider.id, { callbackUrl: '/' })}
                                    className="black_btn">
                                    Sign In
                                </button>
                            )

                            )}
                        </>
                    )
                }
            </div>

            <div className="sm:hidden flex relative">
                {session?.user ? (
                    <div className="flex">
                        <Image
                            src={session?.user?.image}
                            width={37}
                            height={37}
                            className="rounded-full"
                            alt="Profile"
                            onClick={() => {
                                setToggleDropdown((prevState) => !prevState);
                            }}
                        />

                        {toggleDropdown && (
                            <div className="dropdown">
                                <Link
                                    href="/profile"
                                    className="dropdown_link"
                                    onClick={() => setToggleDropdown(false)}>
                                    My Profile
                                </Link>

                                <Link
                                    href="/share-prompt"
                                    className="dropdown_link"
                                    onClick={() => setToggleDropdown(false)}>
                                    Share Prompt
                                </Link>

                                <button
                                    type="button"
                                    onClick={() => {
                                        signOut();
                                        setToggleDropdown(false);
                                    }
                                    }
                                    className="mt-5 w-full black_btn">
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>

                ) : (
                    <>
                        {providers && Object.values(providers).map((provider) => (
                            <button
                                type="button"
                                key={provider.name}
                                onClick={() => signIn(provider.id, { callbackUrl: '/' })}
                                className="black_btn">
                                Sign In
                            </button>
                        )

                        )}
                    </>
                )}
            </div>

        </nav>
    )
}

export default Nav
