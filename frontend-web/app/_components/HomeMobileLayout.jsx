'use client';
import React, {useState} from 'react';
import {SafeArea} from "antd-mobile";
import TopNav from "@/app/_components/TopNav";
import BottomNav from "@/app/_components/BottomNav";

const HomeMobileLayout = ({ children }) => {
    return (
        <div>
            <div style={{background: '#ace0ff'}}>
                <SafeArea position='top'/>
            </div>
            <div style={{
                maxWidth: 480,
                width: "100%",
                position: 'relative',
                margin: "auto",
                border: "1px solid #eee",
                backgroundColor: "#F7F9FC",
                height: "calc(var(--vh, 1vh) * 100)"
            }}>
                <TopNav title={"Hello"} isBack/>
                <div className="container">
                    {children}
                </div>
                <BottomNav/>
            </div>
            <div style={{background: '#ffcfac'}}>
                <SafeArea position='bottom'/>
            </div>
        </div>
    );
};

export default HomeMobileLayout;