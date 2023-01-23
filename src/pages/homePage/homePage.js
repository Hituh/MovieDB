import React from "react"
import "./homePage.css"
import {motion} from "framer-motion"

const Home = () => {
    return (
        <div className="example-container">
            <motion.div className="container1" animate={{ rotate:[0,200,200,0]}}
            transition={{ repeat:Infinity, duration:1}} style={{color:"black",display: "flex",
            justifyContent: "center",alignItems: "center", fontSize:"50px"}}>MovieDB</motion.div>

        </div>
    )
}
export default Home