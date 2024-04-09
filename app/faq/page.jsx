import React from "react";
import Container from "../../components/ui/container";
import Accordion from "../../components/ui/accordion";

const FAQ = () => {
    const questions = [
        {
            title: "How can I register at the Lightweight App?",
            content: <><div style={ {paddingBottom: '15px'}}>You can register in the app following this link: <strong><a href="https://pi-frontend-delta.vercel.app/register">pi-frontend-delta.vercel.app/register</a></strong></div>
            
            There, you will need to use your personal information for registration and a valid email, as we'll send you a validation email so you can start using your account</>
        },
        {
            title: "How can I recharge credits to my account?",
            content: <>You can charge credits starred from $1 USD, and we have many available options to recharge. You can do it by:
            <ol style={ {paddingTop: '15px', paddingBottom: '15px'}}>
                <li>Mercado Pago Wallet</li>
                <li>Rechange on-site</li>
            </ol>
            You can select the best option for you!</>
        },
        {
            title: "What's the maximum amount of coupons I can redeem?",
            content: <>You can redeem how many coupons you like. The system doesn't have restrictions for it. 
            
            However, the total price of all the redeem coupons doesn't exceed the 50% of your purchase. 
            If your discount percentage is up to 50%, the app limits the total discount.</>
        },
        {
            title: "How can I use a discount coupon on my purchases?",
            content: <> To use a discount coupon on your purchases, simply select the products you wish to buy and proceed to checkout. 
            In the order summary section, you will find a field to enter your coupon code. 
            Enter the code and click "Apply" to see the discount reflected in your total purchase.</>
        },
        {
            title: "How can I get discount coupons in Lightweight App?",
            content: <>To obtain discount coupons in Lightweight App, you can earn points by making purchases within the application. 
            You can also redeem credits in your account, which you can recharge using your credit/debit card through Mercado Pago or recharge on-site gym.</>
        },
        {
            title: "Can I transfer my credits to another user account?",
            content: <>Currently, it is not possible to transfer credits between user accounts in Lightweight App. 
            Credits are personal and are associated only with the account in which they were accumulated.
            We recommend using your credits to take advantage of discount opportunities available in your own purchases.</>
        },
        {
            title: "Do discount coupons have any cash value?",
            content: <>No, discount coupons don't have any cash value and cannot be redeemed for cash. 
            They can only be used to obtain discounts on purchases within Lightweight App, according to the conditions established for each coupon.</>
        }
    ];

    return (
        <div id="faq" className="min-h-[100dvh] bg-[#030712] text-gray-50  flex flex-col justify-center">
            <Container className="py-40 gap-5 md:px-20 px-5 flex flex-col justify-center items-center">
                <h1 className="text-red-500 md:text-display text-2xl coanda-bold md:text-nowrap text-center md:text-start">
                    Frequently Asked Questions
                </h1>
                <p className="md:text-2xl text-center max-w-[650px] text-balance mt-2">
                    Have questions? Don't worry, you can find
                    answers here
                </p>

                <div className="w-full mt-10 flex flex-col space-y-6">
                    {questions.map((question, index) => (
                        <Accordion title={question.title} content={question.content} key={index} />
                    ))}
                </div>

                <p className="pt-20 text-center text-sm max-w-[650px] text-balance mt-2">
                    Didn't find your expected answer?
                    Please contact us by Help Center or send email to Lightweightgym@gmail.com
                </p>
            </Container>
        </div>
    );
};

export default FAQ;