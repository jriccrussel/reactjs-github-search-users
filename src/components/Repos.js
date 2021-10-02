import React from 'react'
import styled from 'styled-components'
import { GithubContext } from '../context/context'
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts'

const data = [
  {
    label: "HTML",
    value: "13"
  },
  {
    label: "CSS",
    value: "23"
  },
  {
    label: "Javascript",
    value: "80"
  },
]

const Repos = () => {
  const { repos } = React.useContext(GithubContext)
  //console.log(repos) // checking the data has been pass to this component

  // in reduce "total" is ang total number of arrays or objects
  // in reduce "item" is ang properties inside sa arrays or objects
  // for "let = languages" were only changing or grabbing the property data na naa sa "repos" 
  let languages = repos.reduce((total, item) => {
    // property sulod sa item
    const { language, stargazers_count } = item

    // console.log(total)
    // console.log(item)

    // if ang "language" na propertity is not null "{HTML, CSS, Javascript, null}" return the total "{HTML, CSS, Javascript}"
    if (!language) return total
    // console.log(language) // check wala nay null
        
    if(!total[language]){
      // if does not have properties("HTML, CSS & Javascript") or null then display "{JavaScript: 1, CSS: 1, HTML: 1}"
      // total[language] = 1

      // if does not have propertities, then create an object for each property "label" & "value" look like this "{ CSS: {label: "CSS", value: 1}, HTML: {label: "HTML", value: 1}, JavaScript: {label: "JavaScript", value: 1} }"
      total[language] = { label: language, value: 1, stars: stargazers_count }
    }    
    else{
      // else naay properties like "HTML, CSS & Javascript" and walay null then display it
      // ang "total[language] = total[language] + 1" ge display pila ka instances or kapila ge tawag/call ang property "{JavaScript: 45, CSS: 38, HTML: 14}"
      // total[language] = total[language] + 1

      // else naay properties and is no other null, then create an object for each property "label" & "value" and display it
      // ang "total[language] = {...total[language], value: total[language].value + 1 }" ge display pila ka instances or kapila ge tawag/call ang property "{ CSS: {label: "CSS", value: 45}, HTML: {label: "HTML", value: 38}, JavaScript: {label: "JavaScript", value: 14} }"
      total[language] = {
        ...total[language],
        value: total[language].value + 1,
        stars: total[language].stars + stargazers_count,
      }
    }
    
    //total[language] = 30 // mag add ug properties in each properties sulod sa "language" and so it would look like this: "language: {JavaScript: 30, CSS: 30, HTML: 30}"
    
    return total // remember to return the "total" para mo run ang reduce 
  }, {})
  // console.log(languages)
  
  // ge compile and put it inside an array
  // languages = Object.values(languages)
  // languages = Object.values(languages)
  //   // sort the value and would start from highest to lowest
  //   .sort((a, b) => {
  //     return b.value - a.value;
  //   })
  //   // getting the 1st 5 languages so we display/slice only 5  
  //   .slice(0, 5) 
  // console.log(languages)

  const mostUsed = Object.values(languages)
    .sort((a, b) => {
      return b.value - a.value
    })
    .slice(0, 5)

  const mostPopular = Object.values(languages)
    .sort((a, b) => {
      return b.stars - a.stars
    })
    .map((item) => {
      return { ...item, value: item.stars }
    })
    .slice(0, 5)


  // "stars & forks" properties for the data "repos"
  let { stars, forks } = repos.reduce(
    (total, item) => {
      // properties for the data "repos"
      const { stargazers_count, name, forks } = item;

      // Getting the data, and create and then return an object "label" & "value" for the "stars"
      total.stars[stargazers_count] = { label: name, value: stargazers_count }

      // Getting the data, and create and then return an object "label" & "value" for the "forks"
      total.forks[forks] = { label: name, value: forks }

      return total;
    },

    // initial properties and expect be an object 
    {
      stars: {},
      forks: {},
    }
  )
  
  stars = Object.values(stars).slice(-5).reverse()
  forks = Object.values(forks).slice(-5).reverse()

  return(
    <section className="section">
      <Wrapper className="section-center">
        {/* <Pie3D data={languages} /> */}
        <Pie3D data={mostUsed} />
        <Column3D data={stars}/>
        <Doughnut2D data={mostPopular} />
        <Bar3D data={forks}/>
        {/* <ExampleChart data={data} /> */}
      </Wrapper>
    </section>
  )
}

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`

export default Repos
