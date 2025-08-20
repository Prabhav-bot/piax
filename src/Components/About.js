import AB1 from '../Assets/AB1.jpg';
function About(){
    return(
   <> <div className="s">
        <h1>About PAIX</h1>
        <img src={AB1} className="samosa" alt="samosa" />
        <p>PAIX, founded by Mr. Prabhav Srivastav, is an innovative company dedicated to revolutionizing <br></br>
        education through cutting-edge artificial intelligence technology. The company's core focus is<br></br>
        on creating and suggesting personalized learning paths tailored to individual students’ unique <br></br>
        needs, preferences, and learning styles. By leveraging advanced AI algorithms, PAIX analyzes <br></br>
        learners' strengths, weaknesses, and interests to develop customized educational experiences <br></br>
        that enhance engagement and effectiveness. Through its intelligent platform, PAIX aims to <br></br>
        democratize access to quality education, empower learners to reach their full potential, and <br></br>
        transform the traditional learning landscape into a more adaptive and personalized environment.</p>
    </div>
    <footer className="footer">
        <p>© 2023 PAIX. All rights reserved.</p></footer>
    
    
    </>

    )
};

export default About;