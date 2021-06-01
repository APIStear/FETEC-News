import { useEffect } from "react";
import Banner from "./banner";
import Gallery from './gallery'
import SpecialEvents from "./specialEvents";

const Home = () => {
  var dataSE = [
    {
      icon: "fa fa-comments-o",
      title: "Lorem ipsum",
      text: "Lorem ipsum dolor sit amet placerat facilisis felis mi in tempus eleifend pellentesque natoque etiam.",
    },
    {
      icon: "fa fa-bullhorn",
      title: "Lorem ipsum",
      text: "Lorem ipsum dolor sit amet placerat facilisis felis mi in tempus eleifend pellentesque natoque etiam.",
    },
    {
      icon: "fa fa-group",
      title: "Lorem ipsum",
      text: "Lorem ipsum dolor sit amet placerat facilisis felis mi in tempus eleifend pellentesque natoque etiam.",
    },
    {
      icon: "fa fa-magic",
      title: "Lorem ipsum",
      text: "Lorem ipsum dolor sit amet placerat facilisis felis mi in tempus eleifend pellentesque natoque etiam.",
    },
  ];

  useEffect(() => {
    
  }, [])
  
  return (
    <div>
      <Banner
          data={{ title: "Comité Electoral", paragraph: "Eventos Estudiantiles" }}
      />
      <SpecialEvents data={dataSE} />
      <Gallery/>
    </div>
  )
}

export default Home;