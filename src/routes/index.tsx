import { createFileRoute } from "@tanstack/react-router";
import { Flower2, Heart, Truck, Sparkles, Phone, MapPin, Clock, Instagram, MessageCircle, Star } from "lucide-react";
import heroBouquet from "@/assets/hero-bouquet.jpg";
import collRomantico from "@/assets/coll-romantico.jpg";
import collAlegria from "@/assets/coll-alegria.jpg";
import collElegancia from "@/assets/coll-elegancia.jpg";

const WHATSAPP = "https://wa.me/553133913872?text=Ol%C3%A1!%20Quero%20fazer%20um%20pedido%20na%20Flora%201000%20Flores";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Flora 1000 Flores — Buquês e Arranjos com Entrega" },
      { name: "description", content: "Flora 1000 Flores: buquês, arranjos e presentes florais entregues com carinho. Peça pelo WhatsApp (31) 3391-3872." },
      { property: "og:title", content: "Flora 1000 Flores — Buquês e Arranjos com Entrega" },
      { property: "og:description", content: "Cada data é um motivo a mais pra presentear com carinho." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary/40">
      <Nav />
      <Hero />
      <Features />
      <Collections />
      <About />
      <Occasions />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}

function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_0_24px_-6px_var(--primary)]">
        <Flower2 className="size-5" />
      </div>
      <div className="leading-none">
        <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-primary">Flora</div>
        <div style={{ fontFamily: "var(--font-serif)" }} className="text-xl font-bold text-foreground">
          1000 Flores
        </div>
      </div>
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#colecoes" className="transition-colors hover:text-primary">Coleções</a>
          <a href="#sobre" className="transition-colors hover:text-primary">Sobre</a>
          <a href="#ocasioes" className="transition-colors hover:text-primary">Ocasiões</a>
          <a href="#contato" className="transition-colors hover:text-primary">Contato</a>
        </nav>
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:scale-[1.03] hover:shadow-[0_8px_24px_-8px_var(--primary)]"
        >
          <MessageCircle className="size-4" /> Pedir agora
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* glow */}
      <div className="pointer-events-none absolute -left-32 top-10 size-[420px] rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 size-[520px] rounded-full bg-accent/10 blur-3xl" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 py-16 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:py-24">
        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-primary">
            <Sparkles className="size-3" /> Mês das Flores e dos Afetos
          </span>
          <h1
            style={{ fontFamily: "var(--font-serif)" }}
            className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl"
          >
            Cada flor conta <br />
            <span className="italic text-primary">uma história</span> de afeto.
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
            Na Flora 1000 Flores, cada data é um motivo a mais pra presentear com carinho. Buquês frescos, arranjos sob medida e entrega rápida em toda a cidade.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-[0_10px_30px_-10px_var(--primary)] transition-all hover:scale-[1.03]"
            >
              <MessageCircle className="size-5" /> Peça pelo WhatsApp
            </a>
            <a
              href="#colecoes"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-base font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Ver coleções
            </a>
          </div>

          <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-primary text-primary" />
                ))}
              </div>
              <span>+800 clientes encantados</span>
            </div>
          </div>
        </div>

        {/* hero image */}
        <div className="relative">
          <div className="absolute inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-primary/40 via-accent/20 to-transparent blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-primary/30 bg-card shadow-2xl">
            <img
              src={heroBouquet}
              alt="Buquê assinatura Flora 1000 Flores com rosas, lírios e girassóis"
              width={1280}
              height={1600}
              className="aspect-[4/5] w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent p-6">
              <p style={{ fontFamily: "var(--font-serif)" }} className="text-2xl italic text-primary">
                Junho Florescendo
              </p>
              <p className="text-sm text-muted-foreground">Meio Ambiente · Namorados · São João</p>
            </div>
          </div>

          {/* floating badge */}
          <div className="absolute -left-4 top-8 hidden rounded-2xl border border-border bg-card/95 p-4 shadow-xl backdrop-blur-md md:block">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/15 text-primary">
                <Truck className="size-5" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Entrega no mesmo dia</div>
                <div className="text-sm font-semibold">Pedidos até 16h</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Features() {
  const items = [
    { icon: Flower2, title: "Flores frescas", desc: "Selecionadas diariamente direto do produtor." },
    { icon: Heart, title: "Feitos à mão", desc: "Cada arranjo montado com cuidado artesanal." },
    { icon: Truck, title: "Entrega rápida", desc: "Mesma data em toda a região metropolitana." },
    { icon: Sparkles, title: "Sob medida", desc: "Personalizamos buquês para sua ocasião." },
  ];
  return (
    <section className="border-y border-border/60 bg-card/40">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-5 py-12 md:grid-cols-4 lg:px-8">
        {items.map((it) => (
          <div key={it.title} className="flex flex-col items-start gap-3">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/15 text-primary">
              <it.icon className="size-6" />
            </div>
            <h3 className="font-semibold">{it.title}</h3>
            <p className="text-sm text-muted-foreground">{it.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Collections() {
  const cards = [
    { img: collRomantico, name: "Romântico", desc: "Rosas vermelhas e cor-de-rosa para os apaixonados.", price: "a partir de R$ 149" },
    { img: collAlegria, name: "Alegria", desc: "Girassóis e margaridas que iluminam qualquer dia.", price: "a partir de R$ 119" },
    { img: collElegancia, name: "Elegância", desc: "Lírios e arranjos em vaso para momentos especiais.", price: "a partir de R$ 189" },
  ];
  return (
    <section id="colecoes" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
      <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Coleções</span>
          <h2 style={{ fontFamily: "var(--font-serif)" }} className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            Buquês que <span className="italic text-primary">emocionam</span>
          </h2>
        </div>
        <p className="max-w-sm text-muted-foreground">
          Coleções pensadas para cada momento — escolha a sua e personalizamos no atendimento.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {cards.map((c) => (
          <article
            key={c.name}
            className="group relative overflow-hidden rounded-3xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary/60 hover:shadow-[0_20px_40px_-20px_var(--primary)]"
          >
            <div className="relative aspect-square overflow-hidden">
              <img
                src={c.img}
                alt={`Buquê coleção ${c.name}`}
                width={800}
                height={800}
                loading="lazy"
                className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
            </div>
            <div className="p-6">
              <h3 style={{ fontFamily: "var(--font-serif)" }} className="text-2xl font-bold">{c.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm font-semibold text-primary">{c.price}</span>
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener"
                  className="text-sm font-medium text-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
                >
                  Encomendar →
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="sobre" className="relative overflow-hidden border-y border-border/60 bg-card/30">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 py-20 lg:grid-cols-2 lg:px-8">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Sobre a Flora</span>
          <h2 style={{ fontFamily: "var(--font-serif)" }} className="mt-3 text-4xl font-bold leading-tight md:text-5xl">
            Mil flores. <span className="italic text-primary">Mil histórias.</span> Um só carinho.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Há mais de uma década entregamos sentimentos em forma de flor. Da seleção do produtor à entrega na porta, cada detalhe é pensado para transformar momentos comuns em memórias inesquecíveis.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { n: "+10", l: "anos floríferos" },
              { n: "+800", l: "clientes felizes" },
              { n: "100%", l: "feito à mão" },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl border border-border bg-background/50 p-4 text-center">
                <div style={{ fontFamily: "var(--font-serif)" }} className="text-3xl font-bold text-primary">{s.n}</div>
                <div className="mt-1 text-xs text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="grid grid-cols-2 gap-4">
            <img src={collRomantico} alt="" loading="lazy" width={800} height={800} className="aspect-square rounded-3xl object-cover" />
            <img src={collAlegria} alt="" loading="lazy" width={800} height={800} className="aspect-square translate-y-8 rounded-3xl object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Occasions() {
  const list = ["Aniversários", "Namorados", "Casamentos", "Nascimentos", "Datas comemorativas", "Pedidos corporativos", "Homenagens", "Só porque sim"];
  return (
    <section id="ocasioes" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
      <div className="mb-10 text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Ocasiões</span>
        <h2 style={{ fontFamily: "var(--font-serif)" }} className="mt-3 text-4xl font-bold md:text-5xl">
          Para todo motivo de <span className="italic text-primary">florescer</span>
        </h2>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        {list.map((o) => (
          <span
            key={o}
            className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary hover:bg-primary/10 hover:text-primary"
          >
            {o}
          </span>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  const tt = [
    { name: "Mariana S.", text: "O buquê chegou perfeito e antes do horário. Minha mãe amou — virei cliente!", role: "Dia das Mães" },
    { name: "Rafael A.", text: "Atendimento impecável e flores fresquíssimas. Surpreendi minha namorada de verdade.", role: "Namorados" },
    { name: "Juliana P.", text: "Pedi um arranjo para o escritório e ficou lindo. Já é minha florista oficial.", role: "Corporativo" },
  ];
  return (
    <section className="border-y border-border/60 bg-card/30">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <h2 style={{ fontFamily: "var(--font-serif)" }} className="text-center text-4xl font-bold md:text-5xl">
          Quem recebe <span className="italic text-primary">se encanta</span>
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {tt.map((t) => (
            <figure key={t.name} className="rounded-3xl border border-border bg-background p-6">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-primary text-primary" />
                ))}
              </div>
              <blockquote className="mt-4 text-foreground/90">"{t.text}"</blockquote>
              <figcaption className="mt-4 flex items-center gap-3 border-t border-border pt-4">
                <div className="flex size-9 items-center justify-center rounded-full bg-primary/15 font-bold text-primary">
                  {t.name[0]}
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="contato" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-primary/40 bg-gradient-to-br from-primary/20 via-card to-card p-10 md:p-16">
        <div className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-primary/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 size-80 rounded-full bg-accent/20 blur-3xl" />

        <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 style={{ fontFamily: "var(--font-serif)" }} className="text-4xl font-bold leading-tight md:text-5xl">
              Peça seu arranjo <br />
              <span className="italic text-primary">pelo WhatsApp</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Conte para a gente a ocasião e nós cuidamos do resto — do bilhete à entrega.
            </p>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-lg font-bold text-primary-foreground shadow-[0_14px_40px_-12px_var(--primary)] transition-all hover:scale-[1.03]"
            >
              <MessageCircle className="size-6" /> (31) 3391-3872
            </a>
          </div>

          <div className="grid gap-4">
            {[
              { icon: Phone, t: "Telefone & WhatsApp", v: "(31) 3391-3872" },
              { icon: Clock, t: "Funcionamento", v: "Seg a Sáb · 8h às 18h" },
              { icon: MapPin, t: "Entrega", v: "Belo Horizonte e região" },
            ].map((c) => (
              <div key={c.t} className="flex items-center gap-4 rounded-2xl border border-border bg-background/60 p-4 backdrop-blur">
                <div className="flex size-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <c.icon className="size-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">{c.t}</div>
                  <div className="font-semibold">{c.v}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/60 bg-sidebar">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-5 py-10 md:flex-row md:items-center lg:px-8">
        <Logo />
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Flora 1000 Flores · Feito com carinho 🌻
        </p>
        <div className="flex items-center gap-3">
          <a href="#" className="flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary">
            <Instagram className="size-4" />
          </a>
          <a href={WHATSAPP} target="_blank" rel="noopener" className="flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary">
            <MessageCircle className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
