<template >

  <section class="src-componentes-navbar">
    
    
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
        
          <li class="nav-item">
            <RouterLink class="nav-link" to="/pokedex">Pokedex</RouterLink>
          </li> 
          <li class="nav-item">
            <RouterLink class="nav-link" to="/tablero">Tablero</RouterLink>
          </li>

        <!--   <li class="nav-item">
            <RouterLink class="nav-link" to="/pokemoncard">PokemonCard</RouterLink>
          </li> -->
          
      
        </ul>
        
      </div>
    </nav>
    </section>
  
  </template>
  
  <script >
  
    export default  {
      name: 'src-components-navbar',
      props: [],
      mounted () {
  
      },
      data () {
        return {
  
        }
      },
      methods: {
  
      },
      computed: {
  
      }
  }
  
  
  </script>
  
  <style scoped lang="css">
    .src-components-navbar {
  
    }
  </style>
  