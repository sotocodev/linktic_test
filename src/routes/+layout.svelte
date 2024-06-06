<script>
  import '../styles/global.css';
  import Header from "../UI/organisms/Header/Header.svelte";
  import Footer from "../UI/organisms/Footer/Footer.svelte";
</script>

<div class="flex flex-col gap-10">
  <Header />
  <slot />
  <Footer />
</div>
