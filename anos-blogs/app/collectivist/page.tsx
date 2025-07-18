import React from "react";

export default function CollectivistPage() {
  return (
    <main className="max-w-5xl mx-auto py-16 px-4">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-2 font-serif text-[#2c2a29]">Collectivist Musings</h1>
        <p className="text-lg text-[#6b5f5a]">Exploring the beauty of community, connection, and shared stories.</p>
      </header>
      <section className="mb-12 text-center max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold font-serif mb-4 text-[#2c2a29]">What Does It Mean to Be Collectivist?</h2>
        <p className="text-[#6b5f5a] mb-2">To me, collectivism is about lifting each other up, sharing wisdom, and building something greater together. It's the belief that our stories, struggles, and successes are richer when shared.</p>
        <p className="text-[#6b5f5a]">This page is a celebration of community—through literature, philosophy, and everyday acts of kindness. Here, you'll find reflections on what it means to belong, to support, and to grow together.</p>
      </section>
      <section className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Example article card */}
        <article className="bg-[#fdfbf7] rounded-lg shadow p-6 flex flex-col gap-2 border-t-4 border-[#d4a574]">
          <div className="flex gap-2 mb-1">
            <span className="bg-[#d4a574] text-white text-xs px-2 py-1 rounded-full">Philosophy</span>
            <span className="bg-[#e8dcc0] text-[#6b5f5a] text-xs px-2 py-1 rounded-full">Collectivism</span>
            <span className="bg-[#e8c8d0] text-[#6b5f5a] text-xs px-2 py-1 rounded-full">Featured</span>
          </div>
          <h2 className="text-2xl font-bold font-serif text-[#2c2a29]">The Power of Us</h2>
          <div className="flex gap-4 text-xs text-[#6b5f5a] mb-2">
            <span>December 12, 2024</span>
            <span>10 min read</span>
          </div>
          <p className="text-[#6b5f5a] mb-2">History shows that real change happens when people come together. This article explores how collective action, big and small, can shape our world for the better.</p>
          <a href="#" className="text-[#d4a574] hover:text-[#c49564] font-medium">Read Full Article ⟶</a>
        </article>
        {/* Add more article cards here as needed */}
      </section>
      <section className="mb-12">
        <h2 className="text-2xl font-semibold font-serif text-center mb-6 text-[#2c2a29]">Key Ideas in Community</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-[#f7f3e9] rounded-lg p-4 text-center">
            <div className="text-3xl text-[#d4a574] mb-2">🤝</div>
            <h3 className="font-semibold font-serif mb-1 text-[#2c2a29]">Mutual Support</h3>
            <p className="text-[#6b5f5a] text-sm">Helping each other, sharing resources, and building trust—these are the roots of every strong community.</p>
          </div>
          <div className="bg-[#f7f3e9] rounded-lg p-4 text-center">
            <div className="text-3xl text-[#d4a574] mb-2">👥</div>
            <h3 className="font-semibold font-serif mb-1 text-[#2c2a29]">Collective Action</h3>
            <p className="text-[#6b5f5a] text-sm">Working together to achieve what we can't do alone. Every voice matters, and every effort counts.</p>
          </div>
          <div className="bg-[#f7f3e9] rounded-lg p-4 text-center">
            <div className="text-3xl text-[#d4a574] mb-2">🔗</div>
            <h3 className="font-semibold font-serif mb-1 text-[#2c2a29]">Resource Sharing</h3>
            <p className="text-[#6b5f5a] text-sm">Pooling our strengths and knowledge so everyone can thrive.</p>
          </div>
          <div className="bg-[#f7f3e9] rounded-lg p-4 text-center">
            <div className="text-3xl text-[#d4a574] mb-2">🗳️</div>
            <h3 className="font-semibold font-serif mb-1 text-[#2c2a29]">Shared Decision-Making</h3>
            <p className="text-[#6b5f5a] text-sm">Everyone has a say. True community means listening, learning, and growing together.</p>
          </div>
          <div className="bg-[#f7f3e9] rounded-lg p-4 text-center">
            <div className="text-3xl text-[#d4a574] mb-2">❤️</div>
            <h3 className="font-semibold font-serif mb-1 text-[#2c2a29]">Solidarity</h3>
            <p className="text-[#6b5f5a] text-sm">Standing together through thick and thin, celebrating our differences and our shared dreams.</p>
          </div>
          <div className="bg-[#f7f3e9] rounded-lg p-4 text-center">
            <div className="text-3xl text-[#d4a574] mb-2">⚖️</div>
            <h3 className="font-semibold font-serif mb-1 text-[#2c2a29]">Collective Responsibility</h3>
            <p className="text-[#6b5f5a] text-sm">Caring for each other and our world, because we're all in this together.</p>
          </div>
        </div>
      </section>
      <section className="mb-12 text-center max-w-2xl mx-auto">
        <blockquote className="italic text-lg text-[#6b5f5a] border-l-4 border-[#d4a574] pl-4 mb-2">"Alone we can do so little; together we can do so much."</blockquote>
        <cite className="block text-[#d4a574] font-medium">— Helen Keller</cite>
      </section>
      <section className="mb-12">
        <h2 className="text-2xl font-semibold font-serif text-center mb-6 text-[#2c2a29]">Books on Community</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-[#f7f3e9] rounded-lg p-4 text-center">
            <h4 className="font-semibold font-serif text-[#2c2a29]">The Conquest of Bread</h4>
            <p className="text-[#6b5f5a]">Peter Kropotkin</p>
            <p className="text-[#6b5f5a] text-xs">A classic on mutual aid and the spirit of giving.</p>
          </div>
          <div className="bg-[#f7f3e9] rounded-lg p-4 text-center">
            <h4 className="font-semibold font-serif text-[#2c2a29]">Mutual Aid: A Factor of Evolution</h4>
            <p className="text-[#6b5f5a]">Peter Kropotkin</p>
            <p className="text-[#6b5f5a] text-xs">How cooperation shapes our world and our future.</p>
          </div>
          <div className="bg-[#f7f3e9] rounded-lg p-4 text-center">
            <h4 className="font-semibold font-serif text-[#2c2a29]">The Communist Manifesto</h4>
            <p className="text-[#6b5f5a]">Karl Marx & Friedrich Engels</p>
            <p className="text-[#6b5f5a] text-xs">A call for unity and collective action.</p>
          </div>
          <div className="bg-[#f7f3e9] rounded-lg p-4 text-center">
            <h4 className="font-semibold font-serif text-[#2c2a29]">Pedagogy of the Oppressed</h4>
            <p className="text-[#6b5f5a]">Paulo Freire</p>
            <p className="text-[#6b5f5a] text-xs">Education as a tool for liberation and togetherness.</p>
          </div>
        </div>
      </section>
    </main>
  );
} 