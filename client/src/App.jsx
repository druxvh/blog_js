//Sections
import Header from "./sections/Header";

import Footer from "./sections/Footer";
import Content from "./sections/Content";

function App() {
  return (
    <main>
      <section>
        <Header />
      </section>
      <section>
        <Content />
      </section>
      <section>
        <Footer />
      </section>
    </main>
  );
}

export default App;
