// import wires from '../Assets/wires.jpg';
import AB1 from '../Assets/AB1.jpg';
function Home() {
  return (
        <><div>
            <div className="C1">
                <div>
                    <img id="piaxlogo" src={AB1} height="90%" width="95%" alt="Piaxlogo"/>
                </div>
                <div>
                    <h4 className="title">PAIX AI</h4>
                    <p className="subtitle">Artificial Intelligence for your personalised Learning path</p>
                    <button id="B" type="button">
                        <a className="link" href="/Contact"> Know Your Path </a>
                    </button>
                </div>
                <div className='search1'>
                    <input type="text" id="name" name="name" required />
                </div>
            </div>
        </div></>
  );
}

export default Home;