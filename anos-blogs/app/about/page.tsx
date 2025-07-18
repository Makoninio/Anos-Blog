import React from "react";

export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto py-16 px-4 bg-[#fdfbf7] min-h-screen">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-2 font-serif text-[#2c2a29]">Meet Ano</h1> 
        <p className="text-lg text-[#6b5f5a]">A fellow book lover, story seeker, and community builder.</p>
      </header>
      <section className="grid md:grid-cols-3 gap-8 items-start mb-12">
        <div className="flex flex-col items-center md:items-start">
          <img
            src="/profile.png"
            alt="Profile photo"
            className="w-40 h-40 rounded-full border-2 border-[#d4a574] object-cover bg-[#f7f3e9] mb-4"
          />
        </div>
        <div className="md:col-span-2">
          <p className="mb-4 text-[#6b5f5a]">My name Anotida and I have a lot of questions. Many of them are existential and in the absence of any real experience I've decided to turn to my favourite mode of learning. 
          Literature to answer some of these questions. My first one is can you ruin your life and at what point can you say you have through reading Shakespearean Tragedies. Maybe I'll find answers—or maybe just better questions. 
          Either way, I'm glad to have you along for the ride.
          </p>
        </div>
      </section>
      <section className="grid md:grid-cols-3 gap-8 mb-12">
        <div>
          <h3 className="text-xl font-semibold mb-2 font-serif text-[#2c2a29]">Why I Read</h3>
          <p className="text-[#6b5f5a]">Reading is my way of exploring the world—one page at a time. I love stories that challenge, comfort, and connect us, and I believe every book has something to teach.</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2 font-serif text-[#2c2a29]">What You'll Find Here</h3>
          <p className="text-[#6b5f5a]">From book reviews to musings on community, you'll find a mix of genres, ideas, and heartfelt reflections. I'm always open to recommendations and love hearing what others are reading!</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2 font-serif text-[#2c2a29]">Let's Connect</h3>
          <p className="text-[#6b5f5a]">This blog is as much yours as it is mine. Drop a comment, send a message, or just say hi. I'm always up for a chat about books, life, or anything in between.</p>
        </div>
      </section>
      <section className="mb-12">
        <h3 className="text-xl font-semibold mb-4 font-serif text-center text-[#2c2a29]">A Few Fun Facts</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <span className="block text-3xl font-bold text-[#d4a574] font-serif">100+</span>
            <span className="text-[#6b5f5a] text-xs uppercase tracking-wider">Books Read</span>
          </div>
          <div>
            <span className="block text-3xl font-bold text-[#d4a574] font-serif">50+</span>
            <span className="text-[#6b5f5a] text-xs uppercase tracking-wider">Reviews Shared</span>
          </div>
          <div>
            <span className="block text-3xl font-bold text-[#d4a574] font-serif">25+</span>
            <span className="text-[#6b5f5a] text-xs uppercase tracking-wider">Essays Penned</span>
          </div>
          <div>
            <span className="block text-3xl font-bold text-[#d4a574] font-serif">3</span>
            <span className="text-[#6b5f5a] text-xs uppercase tracking-wider">Years Blogging</span>
          </div>
        </div>
      </section>
      <section className="mb-12">
        <h3 className="text-xl font-semibold mb-4 font-serif text-center text-[#2c2a29]">A Few of My Favorites</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-[#f7f3e9] rounded-lg p-4 text-center">
            <h4 className="font-semibold font-serif text-[#2c2a29]">The Republic</h4>
            <p className="text-[#6b5f5a]">Plato</p>
            <p className="text-[#d4a574] text-xs font-medium">Philosophy</p>
          </div>
          <div className="bg-[#f7f3e9] rounded-lg p-4 text-center">
            <h4 className="font-semibold font-serif text-[#2c2a29]">1984</h4>
            <p className="text-[#6b5f5a]">George Orwell</p>
            <p className="text-[#d4a574] text-xs font-medium">Dystopian Fiction</p>
          </div>
          <div className="bg-[#f7f3e9] rounded-lg p-4 text-center">
            <h4 className="font-semibold font-serif text-[#2c2a29]">The Communist Manifesto</h4>
            <p className="text-[#6b5f5a]">Karl Marx & Friedrich Engels</p>
            <p className="text-[#d4a574] text-xs font-medium">Political Theory</p>
          </div>
          <div className="bg-[#f7f3e9] rounded-lg p-4 text-center">
            <h4 className="font-semibold font-serif text-[#2c2a29]">Brave New World</h4>
            <p className="text-[#6b5f5a]">Aldous Huxley</p>
            <p className="text-[#d4a574] text-xs font-medium">Science Fiction</p>
          </div>
        </div>
      </section>
      <section className="text-center">
        <h3 className="text-xl font-semibold mb-4 font-serif text-[#2c2a29]">Say Hello!</h3>
        <p className="mb-4 text-[#6b5f5a] max-w-xl mx-auto">I love connecting with fellow readers. Whether you want to chat about a book, share your thoughts, or just say hi, my inbox is always open.</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a href="mailto:hello@anosblogs.com" className="inline-flex items-center gap-2 text-[#d4a574] hover:text-[#c49564] font-medium"><span>📧</span>Email Me</a>
          <a href="#" className="inline-flex items-center gap-2 text-[#d4a574] hover:text-[#c49564] font-medium"><span>🐦</span>Twitter</a>
          <a href="#" className="inline-flex items-center gap-2 text-[#d4a574] hover:text-[#c49564] font-medium"><span>📚</span>Goodreads</a>
        </div>
      </section>
    </main>
  );
} 