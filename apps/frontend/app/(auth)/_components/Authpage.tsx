"use client";


import { LabledInput } from "components/ui/LabelInputs";
import { SigninInputType, SignupInputType } from "@infinityMeet/types";
import { signinInputsProps, signupInputsProps } from "@infinityMeet/validators";
import { Button } from "components/ui/button";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export const Authpage = () => {
    const pathName = usePathname();
    const [error, setError] = useState<string>("");

    const [signinInput, setSigninInput] = useState<SigninInputType>({ email: "", password: "" });
    const [signupInput, setSignupInput] = useState<SignupInputType>({ name: "", email: "", password: "" });

    const sendAccessRequest = async () => {
        if (pathName === "/signin") {
            const { success } = signinInputsProps.safeParse(signinInput);
            if (success) {
                await sendSigninRequest();
            } else {
                setError("Please enter a valid email and password");
            }
        } else {
            const { success } = signupInputsProps.safeParse(signupInput);
            if (success) {
                await sendSignupRequest();
            } else {
                setError("Please enter a valid name, email and password");
            }
        }
    }

    const sendSigninRequest = async () => {
        await signIn("credentials", {
            email: signinInput.email,
            password: signinInput.password,
            redirect: true,
            callbackUrl: "/dashboard"
        });
    }

    const sendSignupRequest = async () => {
        await signIn("credentials", {
            email: signupInput.email,
            password: signupInput.password,
            redirect: true,
            callbackUrl: "/dashboard"
        });
    }

    return (
        <div className="h-screen flex flex-col justify-center dark:bg-[#1F1F1F]">
            <div className="flex justify-center">
                <div className="space-y-5">
                    {/* Head */}
                    <div className="text-center">
                        {pathName === "/signin" ? (
                            <div>
                                <div className="text-4xl font-bold">
                                    Signin with email
                                </div>
                                <div className="mt-2">
                                    Don't have an account?
                                    <Link href="/signup" className="underline pl-2">Signup</Link>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div className="text-4xl font-bold">
                                    Create a fresh account
                                </div>
                                <div className="mt-2">
                                    Already have an account?
                                    <Link href="/signin" className="underline pl-2">Signin</Link>
                                </div>
                            </div>
                        )}
                        <div className="text-red-500 mt-2">
                            {error}
                        </div>
                    </div>

                    {/* Inputs */}
                    <div className="min-w-sm">
                        {pathName === "/signup" && (
                            <LabledInput
                                lable={"Username"}
                                type="text"
                                placeholder={"Enter your name"}
                                onChange={(e) => { setSignupInput({ ...signupInput, name: e.target.value }) }}
                            />
                        )}
                        <LabledInput
                            lable={"Email"}
                            type="email"
                            placeholder={"Enter your email Id"}
                            onChange={(e) => {
                                if (pathName === "/signin") {
                                    setSigninInput({ ...signinInput, email: e.target.value })
                                } else {
                                    setSignupInput({ ...signupInput, email: e.target.value })
                                }
                            }}
                        />

                        <LabledInput
                            lable={"Password"}
                            type="password"
                            placeholder={"Enter password"}
                            onChange={(e) => {
                                if (pathName === "/signin") {
                                    setSigninInput({ ...signinInput, password: e.target.value })
                                } else {
                                    setSignupInput({ ...signupInput, password: e.target.value })
                                }
                            }}
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col items-center justify-center space-y-5">
                        <Button
                            variant="default"
                            size="lg"
                            className="min-w-xs mt-3"
                            onClick={sendAccessRequest}
                        >
                            {pathName === "/signin" ? (
                                "Signin"
                            ) : (
                                "Signup"
                            )}
                        </Button>

                        <div className="border w-full" />

                        <Button
                            variant="default"
                            size="lg"
                            className="min-w-xs"
                            onClick={async () => { await signIn("google") }}
                        >
                            <div className="flex justify-center">
                                <svg className="w-6 h-6 text-white dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M12.037 21.998a10.313 10.313 0 0 1-7.168-3.049 9.888 9.888 0 0 1-2.868-7.118 9.947 9.947 0 0 1 3.064-6.949A10.37 10.37 0 0 1 12.212 2h.176a9.935 9.935 0 0 1 6.614 2.564L16.457 6.88a6.187 6.187 0 0 0-4.131-1.566 6.9 6.9 0 0 0-4.794 1.913 6.618 6.618 0 0 0-2.045 4.657 6.608 6.608 0 0 0 1.882 4.723 6.891 6.891 0 0 0 4.725 2.07h.143c1.41.072 2.8-.354 3.917-1.2a5.77 5.77 0 0 0 2.172-3.41l.043-.117H12.22v-3.41h9.678c.075.617.109 1.238.1 1.859-.099 5.741-4.017 9.6-9.746 9.6l-.215-.002Z" clipRule="evenodd" />
                                </svg>
                                <div className="pl-5">
                                    Sign in with Google
                                </div>
                            </div>
                        </Button>

                    </div>


                </div>
            </div>
        </div>
    )
}