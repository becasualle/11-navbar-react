import React, { useState, useRef, useEffect } from 'react'
import { FaBars, FaTwitter } from 'react-icons/fa'
import { links, social } from './data'
import logo from './logo.svg'

const Navbar = () => {
  // showLinks - flag for burger btn
  const [showLinks, setShowLinks] = useState(false);
  // refs for setting dynamic syze of links container depending on number of items
  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);

  // everytime we toggle showLinks value set new height to container with child links
  useEffect(() => {
    // get  height of all links in ul
    const linksHeight = linksRef.current.getBoundingClientRect().height;
    console.log(linksRef.current.getBoundingClientRect());

    // if we want to show links - set size depending on number of links
    if (showLinks) {
      linksContainerRef.current.style.height = `${linksHeight}px`;
      // when we hid links - set 0px to container
    } else {
      linksContainerRef.current.style.height = '0px';
    }

  }, [showLinks])
  // only works with parent div container
  // for bigger screens (min-width: 800px) set .links-container {height: auto !important;} so it will overwrite inline styles and show those links
  // for mobile size set initial value to .links-container {height: 0;} in order to not showing big height before we re-render

  return (
    <nav>
      <div className="nav-center">
        <div className="nav-header">
          <img src={logo} alt="logo" />
          {/* when click on button toggle showLinks to opposite value */}
          <button className="nav-toggle" onClick={() => setShowLinks(!showLinks)}>
            <FaBars />
          </button>
        </div>
        {/* add refs to get linksRef height and set it to linksContainerRef height*/}
        <div className='links-container' ref={linksContainerRef}>
          <ul className="links" ref={linksRef}>
            {links.map(link => {
              const { id, url, text } = link;

              return (
                <li key={id}><a href={url}>{text}</a></li>
              )
            })}
          </ul>
        </div>


        <ul className="social-icons">
          {social.map(link => {
            const { id, url, icon } = link;

            return (
              <li key={id}><a href={url}>{icon}</a></li>
            )

          })}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
