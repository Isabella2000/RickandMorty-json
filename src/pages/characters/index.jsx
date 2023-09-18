import { useEffect, useState } from "react"

const CharactersPage = () => {
  const [characters, setCharacters] = useState({  
    info:{},
    results:[]
  })
  const [page, setPage] = useState(1)

  const fetchCharacters = async () => {
    const result = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
    const json = await result.json()
    setCharacters(json)
  }
  
  const nextPage = () => {
    setPage(page + 1)
  }
  
  const previousPage = () => {
    setPage(page - 1)
  }

  useEffect(() => {
    fetchCharacters()
  }, [page])

  return (
    <div
    style={{
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      gap: '30px',
      width: '100vw',
      height: '100vh',
      flexWrap: 'wrap'
    }} 
    >
      {
        characters.results.map((character, index) => <CharacterCard key={index} character={character} />)
      }



      <div
      style={{
        width: '100%',
        display: 'flex',
        gap: '20px',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#FFFFFF',
        padding: '15px'
      }}
      >
        <button onClick={previousPage} disabled={page === 1}>{'<'}</button>
        <span>Page: {page}</span>
        <button onClick={nextPage} disabled={characters.info.pages === page}>{'>'}</button>
      </div>
    </div>
  )
}

const CharacterCard  = ({character}) =>{
  return (
    <div
    style={{
      width: '300px',
      height: '340px',
      padding: '20px',
      borderRadius: '20px',
      background: '#FFFFFF'
    }}
    > 
      <img src={character.image} width={200} height={200}/>
      <div>
        <p>Nombre: {character.name}</p>
        <p>Specie: {character.species}</p>
        <p>Alive: {character.status === 'Alive' ? 'SI' : 'NO'}</p>
        <button onClick={() => {alert(`hiciste click en el id: ${character.id}`)}}> Get id</button>
      </div>
    </div>
  )
}

export default CharactersPage

