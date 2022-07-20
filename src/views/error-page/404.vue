<template>
  <div class="container">
    <aside><img src="./images/Mirror.png" alt="404 Image" /></aside>
    <main>
      <h1>Sorry!</h1>
      <p>要么你不够酷，无法访问此网页，要么它不存在</p>
      <button @click="handleGoHome">返回主页！</button>
    </main>
  </div>
</template>

<script setup>
import {} from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const handleGoHome = () => {
  router.push('/')
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Fontdiner+Swanky&family=Roboto:wght@500&display=swap');
* {
  box-sizing: 0;
  margin: 0;
  padding: 0;
  cursor: url('./images/cursors-edge.png'), auto;
}

body {
  background: -webkit-gradient(
    linear,
    left top,
    right top,
    color-stop(50%, white),
    color-stop(50%, #383838)
  );
  background: linear-gradient(to right, white 50%, #383838 50%);
  font-family: 'Roboto', sans-serif;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.5;
  color: white;
}

.container {
  display: -webkit-box;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  background: #383838;
  height: 100vh;
  max-width: 1000px;
  width: calc(100% - 4rem);
  margin: 0 auto;
}
.container > * {
  display: -webkit-box;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-flow: column;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  height: 100vh;
  max-width: 500px;
  width: 100%;
  padding: 2.5rem;
  box-sizing: border-box;
}

aside {
  background-image: url('./images/right-edges.png');
  background-position: top right;
  background-repeat: no-repeat;

  background-color: white;
}
aside img {
  display: block;
  height: auto;
  width: 100%;
}

main {
  text-align: center;
}
main h1 {
  font-family: 'Fontdiner Swanky', cursive;
  font-size: 4rem;
  color: #c5dc50;
  margin-bottom: 1rem;
}
main p {
  margin-bottom: 2.5rem;
}
main button {
  font-family: 'Fontdiner Swanky', cursive;
  font-size: 1rem;
  color: #383838;
  border: none;
  background-color: #f36a6f;
  padding: 1rem 2.5rem;
  -webkit-transform: skew(-5deg);
  transform: skew(-5deg);
  -webkit-transition: all 0.1s ease;
  transition: all 0.1s ease;
}
main button:hover {
  background-color: #c5dc50;
  -webkit-transform: scale(1.15);
  transform: scale(1.15);
}

@media (max-width: 700px) {
  .container {
    background: #383838;
    font-size: 16px;
  }

  .container {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-flow: column;
  }
  div > * {
    max-width: 700px;
    height: 100%;
  }

  aside {
    background-image: none;
    background-color: white;
  }
  aside img {
    max-width: 300px;
  }
}
</style>
