import './App.css';
import { gsap, TimelineMax } from 'gsap'
import { useEffect, useState } from 'react'
function App() {
  const [isCompleted, setIsCompleted] = useState(true)
  const [circles, setCircles] = useState([
    { class: "red", isUp: false },
    { class: "blue", isUp: false },
    { class: "green", isUp: false }
  ]);



  var tl = gsap.timeline();

  const anim = () => {
    if (isCompleted) {
      setIsCompleted(false)
      tl.staggerTo(".circle", 1, {
        opacity: 0,
        y: "-100%"
      }, 0.5)

    } else {
      setIsCompleted(true)
      tl.staggerTo(".circle", 1, {
        opacity: 1,
        y: "100%"
      }, 0.5)
    }
  }

  const goUp = (event, cls) => {
    var up = circles[circles.findIndex(e => e.isUp == true)]
    if (up != null) {
      gsap.to("." + up.class, {
        opacity: 1,
        y: 0,
        duration: 1
      })
    }

    gsap.to("." + cls, {
      opacity: 0,
      y: "-100%",
      duration: 1
    })

    var tmp = circles
    tmp[tmp.findIndex(e => e.class === cls)].isUp = true
    setCircles([...tmp])

    if (up != null) {
      var tmp2 = circles
      tmp2[tmp2.findIndex(e => e.class === up.class)].isUp = false
      setCircles([...tmp2])
    }
  }


  useEffect(() => {
    tl.staggerFrom(".circle", 0.5, {
      opacity: 0,
      y: "-100%",
    }, 0.5)


  }, [])

  return (
    <div className="App">
      <h1>{isCompleted.toString()}</h1>
      {
        circles.map((e, i) => <div key={i} onClick={(ev) => goUp(ev, e.class)} className={"circle " + e.class}></div>)
      }
    </div>
  );
}

export default App;
