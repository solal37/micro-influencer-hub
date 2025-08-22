"use client";


import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  Sparkles,
  Users,
  LineChart,
  Video,
  Zap,
  ShieldCheck,
  MessageCircle,
  Star,
  Crown,
  ArrowRight,
  Wand2,
  Image as ImageIcon,
  Info,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

/**
 * Micro‑Influencer Hub — Themeable Landing (Preview)
 * -------------------------------------------------
 * FULL VERSION (Blush‑themed by default)
 * - Rich, image‑driven design with prompts guide at the bottom.
 * - Use this as a visual spec; recreate sections in Notion.
 */

const PRESETS = {
  blush: {
    name: "Blush",
    primary: "#ff6ea9",
    accent: "#ffe5ef",
    heroGradient: "from-rose-50 via-pink-50 to-rose-100",
  },
  sage: {
    name: "Sage",
    primary: "#3ba37b",
    accent: "#e7f6ef",
    heroGradient: "from-emerald-50 via-green-50 to-emerald-100",
  },
  lavender: {
    name: "Lavender",
    primary: "#7c6cf0",
    accent: "#efeefe",
    heroGradient: "from-indigo-50 via-violet-50 to-purple-100",
  },
  sand: {
    name: "Sand",
    primary: "#e6b676",
    accent: "#f8efe3",
    heroGradient: "from-amber-50 via-orange-50 to-amber-100",
  },
  noir: {
    name: "Noir",
    primary: "#111111",
    accent: "#f3f3f3",
    heroGradient: "from-zinc-50 via-neutral-50 to-zinc-100",
  },
} as const;

type PresetKey = keyof typeof PRESETS;

// Prompts adapted to the BLUSH theme + beauty/fashion/lifestyle shopping
const PROMPTS: Record<string, { label: string; ratio: string; text: string }[]> = {
  hero: [
    {
      label: "Hero — premium shopping lifestyle",
      ratio: "16:9",
      text:
        "Cinematic lifestyle shopping scene for a micro‑influencer hub, premium editorial look, palette blush #ff6ea9 + soft accent #ffe5ef, natural window light, soft shadows, shallow depth of field, clean negative space for headline, subtle fashion/beauty cues (lipstick, silk scarf, sunglasses), no logos, professional color grading, minimal props — 16:9. Avoid over‑saturation, neon, sales banners, watermarks, AliExpress vibe, cheap plastic.",
    },
    {
      label: "Hero side — mirror try‑on portrait",
      ratio: "4:5 or 3:4",
      text:
        "Mirror try‑on portrait, fashion focus, candid but premium, palette blush (#ff6ea9/#ffe5ef), soft glow, clean background, editorial feel, no brand logos — 4:5. Avoid heavy HDR.",
    },
  ],
  moodstrip: [
    {
      label: "Mood 1 — beauty morning routine",
      ratio: "16:9",
      text:
        "Minimal marble vanity, frosted glass bottles, cotton towel, fern leaf, sunlit steam on mirror. Palette blush (#ff6ea9) + cream (#fff5f2). Close framing, soft glow, tiny droplets, real routine feel — 16:9.",
    },
    {
      label: "Mood 2 — fashion flat‑lay",
      ratio: "16:9",
      text:
        "Neatly styled outfit on linen: knit sweater, relaxed jeans, leather tote, gold hoops. Warm daylight, subtle film grain, editorial top‑down composition, palette blush + warm sand — 16:9.",
    },
    {
      label: "Mood 3 — mobile shopping",
      ratio: "16:9 or 9:16",
      text:
        "Hand holding smartphone while browsing products, elegant manicure, boutique bokeh background, crisp reflections, premium case texture, no brand logos, palette blush — 16:9.",
    },
  ],
  why: [
    {
      label: "Why — co‑creation moodboard",
      ratio: "16:9",
      text:
        "Overhead creative desk with sketchbook, fabric swatches, packaging dielines, sticky notes reading 'co‑create' and 'audience fit', tidy premium stationery, soft daylight, blush accents (#ff6ea9/#ffe5ef), editorial minimalism, no brand logos — 16:9.",
    },
  ],
  quality: [
    {
      label: "Quality — premium packaging macro",
      ratio: "16:9",
      text:
        "Macro shot of premium packaging: textured box, satin ribbon, foil‑stamped card, ceramic tray, diffused top light, micro‑contrast, velvet texture, blush accents (#ff6ea9), elegant, no visible brand, high resolution — 16:9.",
    },
  ],
  steps: [
    {
      label: "Step 1 Post — creator desk",
      ratio: "1:1",
      text:
        "Minimal creator desk with phone tripod (off), notebook with 'hooks' list, airy light, tidy layout, blush accents, editorial style — 1:1.",
    },
    {
      label: "Step 2 Boost — cross‑tag phones",
      ratio: "1:1",
      text:
        "Two smartphones in hands tagging each other, subtle notification bubbles (generic UI), motion blur, blush accents — 1:1, no brand logos.",
    },
    {
      label: "Step 3 Analyze — analytics laptop",
      ratio: "1:1",
      text:
        "Laptop with generic social analytics dashboard (no brand UI), notebook + pen, clean grid, natural light, blush sticky notes — 1:1.",
    },
    {
      label: "Step 4 Earn — checkout success",
      ratio: "1:1",
      text:
        "Close‑up of phone 'order success' screen (generic UI) with soft confetti feel, card slightly out of focus, bright, blush highlight — 1:1.",
    },
  ],
  community: [
    {
      label: "Weekly Live — video call grid",
      ratio: "16:9",
      text:
        "Aesthetic video call grid with diverse creators (no real brand UI), soft daylight home setups, smiles, notebooks, editorial warm tones, blush accents — 16:9.",
    },
    {
      label: "Group Chat — messaging app style",
      ratio: "16:9",
      text:
        "Phone macro showing a generic messaging app style chat about content tips (no WhatsApp logo), minimal bubbles, premium blush UI accent — 16:9.",
    },
    {
      label: "Highlights — best‑performing posts",
      ratio: "16:9",
      text:
        "Flat‑lay of smartphone grid with blurred reels/thumbnails (unbranded), small stickers 'save' 'share', minimal props, blush tone — 16:9.",
    },
  ],
  ugc: [
    { label: "UGC 1 — street style bag", ratio: "4:5", text: "Cropped street‑style shot with tote bag, crosswalk blur, morning sun flare, editorial city vibe, blush highlight — 4:5." },
    { label: "UGC 2 — skincare close‑up", ratio: "4:5", text: "Hand applying serum, frosted bottle, water droplets, clean tile, soft bathroom light, blush towel detail — 4:5." },
    { label: "UGC 3 — unboxing hands", ratio: "4:5", text: "Hands opening textured box with tissue paper and foil sticker, dust motes in backlight, macro cinematic, blush ribbon — 4:5." },
    { label: "UGC 4 — wellness minimal", ratio: "4:5", text: "Yoga mat, water bottle, eucalyptus branch on warm wood floor, airy negative space, calm premium tone, blush strap detail — 4:5." },
  ],
};

export default function LandingPreview() {
  // Default to BLUSH as requested
  const [presetKey, setPresetKey] = useState<PresetKey>("blush");

  // Key images (replace with your generated URLs)
  const [heroUrl, setHeroUrl] = useState<string>(
    "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1600&auto=format&fit=crop"
  );
  const [hero2Url, setHero2Url] = useState<string>(
    "https://images.unsplash.com/photo-1513908957990-b2790723edbf?q=80&w=1400&auto=format&fit=crop"
  );
  const [profileUrl, setProfileUrl] = useState<string>(
    "https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=800&auto=format&fit=crop"
  );

  // Mood strip
  const [mood1Url, setMood1Url] = useState<string>(
    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1400&auto=format&fit=crop"
  );
  const [mood2Url, setMood2Url] = useState<string>(
    "https://images.unsplash.com/photo-1544979596-3b1b4a4a4a07?q=80&w=1400&auto=format&fit=crop"
  );
  const [mood3Url, setMood3Url] = useState<string>(
    "https://images.unsplash.com/photo-1557180295-76eee20ae8aa?q=80&w=1400&auto=format&fit=crop"
  );

  // Why & Quality backdrops
  const [whyUrl, setWhyUrl] = useState<string>(
    "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1400&auto=format&fit=crop"
  );
  const [qualityUrl, setQualityUrl] = useState<string>(
    "https://images.unsplash.com/photo-1601121140781-e0c5ad1a3a3a?q=80&w=1400&auto=format&fit=crop"
  );

  // Steps mini visuals
  const [stepPostUrl, setStepPostUrl] = useState<string>(
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop"
  );
  const [stepBoostUrl, setStepBoostUrl] = useState<string>(
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop"
  );
  const [stepAnalyzeUrl, setStepAnalyzeUrl] = useState<string>(
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop"
  );
  const [stepEarnUrl, setStepEarnUrl] = useState<string>(
    "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1200&auto=format&fit=crop"
  );

  // Community visuals
  const [communityLiveUrl, setCommunityLiveUrl] = useState<string>(
    "https://images.unsplash.com/photo-1598257006458-087169a1f08b?q=80&w=1400&auto=format&fit=crop"
  );
  const [communityChatUrl, setCommunityChatUrl] = useState<string>(
    "https://images.unsplash.com/photo-1516387938699-a93567ec168e?q=80&w=1400&auto=format&fit=crop"
  );
  const [communityBestUrl, setCommunityBestUrl] = useState<string>(
    "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1400&auto=format&fit=crop"
  );

  // UGC gallery
  const [ugc1Url, setUgc1Url] = useState<string>(
    "https://images.unsplash.com/photo-1520975922215-230df4330a16?q=80&w=1200&auto=format&fit=crop"
  );
  const [ugc2Url, setUgc2Url] = useState<string>(
    "https://images.unsplash.com/photo-1530931736275-08ad2f38c257?q=80&w=1200&auto=format&fit=crop"
  );
  const [ugc3Url, setUgc3Url] = useState<string>(
    "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200&auto=format&fit=crop"
  );
  const [ugc4Url, setUgc4Url] = useState<string>(
    "https://images.unsplash.com/photo-1547082299-de196ea013d6?q=80&w=1200&auto=format&fit=crop"
  );

  const theme = PRESETS[presetKey];

  const primaryBtn = useMemo(
    () => ({
      backgroundColor: theme.primary,
      color: theme.name === "Noir" ? "#f7f7f7" : "white",
    }),
    [theme]
  );

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      {/* Top bar */}
      <header className="sticky top-0 z-30 backdrop-blur bg-white/70 border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            <span className="font-semibold">Micro‑Influencer Hub</span>
          </div>
          <div className="flex items-center gap-2">
            <Button style={primaryBtn} className="rounded-xl px-4">Apply</Button>
            <Button variant="outline" className="rounded-xl px-4">WhatsApp</Button>
          </div>
        </div>
      </header>

      {/* Theme controls */}
      <div className="max-w-6xl mx-auto px-4 py-4 grid lg:grid-cols-3 gap-3">
        <Card className="lg:col-span-2">
          <CardContent className="p-4 flex items-start gap-3">
            <Wand2 className="h-5 w-5 mt-1" />
            <div className="text-sm">
              <div className="font-medium">Theme & images quick setup</div>
              <div className="text-zinc-600">Blush palette selected. Replace image URLs below to match your niche. Use the prompts guide at the bottom to generate assets.</div>
            </div>
          </CardContent>
        </Card>
        <div className="flex gap-2 flex-wrap items-center">
          {Object.entries(PRESETS).map(([key, p]) => (
            <button
              key={key}
              onClick={() => setPresetKey(key as PresetKey)}
              className={`border rounded-xl px-3 py-2 text-sm hover:shadow ${presetKey === key ? "ring-2 ring-offset-2" : ""}`}
              style={{ borderColor: p.primary }}
              title={p.name}
            >
              <span className="inline-block w-4 h-4 rounded-full mr-2" style={{ backgroundColor: p.primary }} />
              {p.name}
            </button>
          ))}
        </div>

        {/* Key image inputs */}
        <div className="lg:col-span-3 grid md:grid-cols-2 xl:grid-cols-3 gap-3">
          <input className="border rounded-xl px-3 py-2 text-sm" placeholder="Hero image URL" value={heroUrl} onChange={(e) => setHeroUrl(e.target.value)} />
          <input className="border rounded-xl px-3 py-2 text-sm" placeholder="Hero side image URL" value={hero2Url} onChange={(e) => setHero2Url(e.target.value)} />
          <input className="border rounded-xl px-3 py-2 text-sm" placeholder="Organizer profile image URL" value={profileUrl} onChange={(e) => setProfileUrl(e.target.value)} />
        </div>
      </div>

      {/* Hero (with side collage) */}
      <section className={`relative overflow-hidden bg-gradient-to-br ${theme.heroGradient}`}>
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: `url(${heroUrl})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="relative max-w-6xl mx-auto px-4 py-16 sm:py-24 grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-3xl sm:text-5xl font-bold leading-tight">
              Grow Together. Sell Smarter. Keep <span style={{ color: theme.primary }}>100%</span> of Your Affiliate Sales.
            </h1>
            <p className="mt-4 text-zinc-700 text-lg">
              A private hub for micro‑influencers (25–35) to cross‑promote viral posts, get data‑driven content guidance, join weekly lives, and launch premium products without upfront cost.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button style={primaryBtn} className="rounded-xl px-5 py-6">Apply to Join</Button>
              <Button variant="outline" className="rounded-xl px-5 py-6">Watch Intro Video</Button>
            </div>
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-zinc-700">
              <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4"/> Free to join</div>
              <div className="flex items-center gap-2"><Zap className="h-4 w-4"/> Cross‑marketing boost</div>
              <div className="flex items-center gap-2"><Video className="h-4 w-4"/> Weekly live sessions</div>
            </div>
          </motion.div>

          {/* Right column: image collage + organizer card */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="space-y-4">
            <div className="grid grid-cols-5 gap-3">
              <div className="col-span-3 rounded-2xl overflow-hidden ring-4" style={{ ringColor: theme.accent }}>
                <img src={hero2Url} alt="Hero side" className="w-full h-48 object-cover" />
              </div>
              <div className="col-span-2 rounded-2xl overflow-hidden ring-4" style={{ ringColor: theme.accent }}>
                <img src={mood1Url} alt="Mood" className="w-full h-48 object-cover" />
              </div>
            </div>
            <Card className="backdrop-blur bg-white/70 border-0 shadow-xl rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <img src={profileUrl} alt="Organizer" className="w-20 h-20 rounded-full object-cover ring-4" style={{ ringColor: theme.accent }} />
                  <div>
                    <div className="font-semibold">Organizer — Your Name</div>
                    <div className="text-sm text-zinc-600">Weekly host • Content analyst • Product builder • Ad strategist</div>
                  </div>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-zinc-700">
                  <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5"/> I host the weekly 60‑min live & moderate the WhatsApp group.</li>
                  <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5"/> I analyze posts and give specific next‑post recommendations.</li>
                  <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5"/> I coordinate cross‑tags when a post trends to extend the viral window.</li>
                  <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5"/> I create product pages, work with suppliers, and manage sales & tracking.</li>
                  <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5"/> I run paid ads remixing your best UGC to scale ROAS.</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Mood strip (ambience images) */}
      <section className="max-w-6xl mx-auto px-4 -mt-6">
        <div className="grid md:grid-cols-3 gap-4">
          {[{url: mood1Url, label: "Beauty"}, {url: mood2Url, label: "Fashion"}, {url: mood3Url, label: "Shopping"}].map((m, i) => (
            <div key={i} className="relative rounded-2xl overflow-hidden group ring-4" style={{ ringColor: theme.accent }}>
              <img src={m.url} alt={m.label} className="w-full h-48 md:h-56 object-cover group-hover:scale-[1.02] transition" />
              <div className="absolute bottom-3 left-3 bg-white/80 backdrop-blur px-3 py-1 rounded-full text-xs font-medium" style={{ color: theme.primary }}>{m.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Why it matters + Quality (with soft image banners) */}
      <section className="max-w-6xl mx-auto px-4 py-14 grid md:grid-cols-2 gap-8">
        <Card className="rounded-2xl overflow-hidden">
          <div className="h-28 w-full bg-cover bg-center opacity-80" style={{ backgroundImage: `url(${whyUrl})` }} />
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-2"><LineChart className="h-5 w-5"/> <h3 className="font-semibold text-lg">Why this program matters</h3></div>
            <p className="text-zinc-700">Launching a new product (digital or physical) usually needs serious upfront cash (often €10k+). Instead, we co‑create with multiple influencers, pooling audiences for higher success — with <strong>zero upfront cost</strong> to you.</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5"/> Shared reach → stronger launches</li>
              <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5"/> No risk: we handle suppliers, production, logistics</li>
              <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5"/> You keep <strong>100% of affiliate revenue</strong> on direct sales</li>
            </ul>
          </CardContent>
        </Card>
        <Card className="rounded-2xl overflow-hidden">
          <div className="h-28 w-full bg-cover bg-center opacity-80" style={{ backgroundImage: `url(${qualityUrl})` }} />
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-2"><ShieldCheck className="h-5 w-5"/> <h3 className="font-semibold text-lg">Quality over cheap products</h3></div>
            <p className="text-zinc-700">We don’t dropship low‑quality items. We build <strong>premium, audience‑driven</strong> products with trusted suppliers — strengthening your personal brand and customer trust.</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5"/> Real demand from your audience</li>
              <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5"/> Higher perceived value, longer lifetime</li>
              <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5"/> You take <strong>no financial risk</strong></li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* How it works (cards with mini images) */}
      <section className="max-w-6xl mx-auto px-4 py-4">
        <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2"><Users className="h-5 w-5"/> How it works</h3>
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { title: "Post", desc: "Create in your niche as usual.", img: stepPostUrl },
            { title: "Boost", desc: "When a post trends, we coordinate cross‑tags & shares.", img: stepBoostUrl },
            { title: "Analyze", desc: "Weekly review (reach, saves, CTR, ER%). Get next‑post recs.", img: stepAnalyzeUrl },
            { title: "Earn 100%", desc: "Use your affiliate link; keep all direct sales.", img: stepEarnUrl },
          ].map((item, i) => (
            <Card key={i} className="rounded-2xl overflow-hidden">
              <div className="h-28 w-full bg-cover bg-center" style={{ backgroundImage: `url(${item.img})` }} />
              <CardContent className="p-5">
                <div className="text-sm text-zinc-500">Step {i + 1}</div>
                <div className="font-semibold mt-1">{item.title}</div>
                <p className="text-sm text-zinc-700 mt-2">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Value exchange */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2"><Star className="h-5 w-5"/> Transparent value exchange</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="rounded-2xl">
            <CardContent className="p-6">
              <h4 className="font-semibold mb-3">Influencers get</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5"/> Amplified visibility when content pops</li>
                <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5"/> Motivation & support (weekly live + WhatsApp)</li>
                <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5"/> Content guidance on what to post next</li>
                <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5"/> 100% of affiliate revenue on direct sales</li>
                <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5"/> Personal brand growth & independence</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="rounded-2xl">
            <CardContent className="p-6">
              <h4 className="font-semibold mb-3">The company gets</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5"/> Lower ad costs from community traffic</li>
                <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5"/> Create brands aligned with influencer audiences</li>
                <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5"/> Product improvement via creator feedback</li>
                <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5"/> Reuse UGC on brand channels</li>
                <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5"/> Indirect sales via retargeting & abandoned carts</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Community (with visual cards) */}
      <section className="max-w-6xl mx-auto px-4 py-4 grid md:grid-cols-3 gap-4">
        {[
          { icon: <Video className="h-5 w-5" />, title: "Weekly live (60 min)", text: "Motivation, audits, and next‑week plan.", img: communityLiveUrl },
          { icon: <MessageCircle className="h-5 w-5" />, title: "WhatsApp group", text: "Daily tips, boosts, and quick answers.", img: communityChatUrl },
          { icon: <LineChart className="h-5 w-5" />, title: "Best‑performing posts", text: "We highlight & replicate what works.", img: communityBestUrl },
        ].map((b, i) => (
          <Card key={i} className="rounded-2xl overflow-hidden">
            <div className="h-32 w-full bg-cover bg-center" style={{ backgroundImage: `url(${b.img})` }} />
            <CardContent className="p-6">
              <div className="flex items-center gap-2">{b.icon}<div className="font-semibold">{b.title}</div></div>
              <p className="text-sm text-zinc-700 mt-2">{b.text}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* UGC gallery (lively strip) */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[ugc1Url, ugc2Url, ugc3Url, ugc4Url].map((u, i) => (
            <div key={i} className="rounded-2xl overflow-hidden ring-4" style={{ ringColor: theme.accent }}>
              <img src={u} alt={`UGC ${i+1}`} className="w-full h-60 object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h3 className="text-3xl font-semibold">Ready to grow with a premium, zero‑risk model?</h3>
        <p className="text-zinc-700 mt-2">Join the hub, keep 100% of your affiliate sales, and launch products backed by multiple audiences.</p>
        <div className="mt-6 flex justify-center gap-3">
          <Button style={primaryBtn} className="rounded-xl px-6 py-6">Apply Now <ArrowRight className="ml-2 h-4 w-4"/></Button>
          <Button variant="outline" className="rounded-xl px-6 py-6">Contact</Button>
        </div>
        <div className="mt-6 text-xs text-zinc-500">By applying, you agree to allow UGC reuse on brand channels. You always keep ownership of your original content.</div>
      </section>

      {/* Builder notes: prompts for each image slot (not for Notion) */}
      <section className="max-w-6xl mx-auto px-4 pb-14">
        <Card className="rounded-2xl border-dashed">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4"><Info className="h-5 w-5"/><h4 className="font-semibold">Prompts & image slots (BLUSH theme)</h4></div>
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              {Object.entries(PROMPTS).map(([group, arr]) => (
                <div key={group}>
                  <div className="font-medium mb-2 capitalize">{group}</div>
                  <ul className="space-y-3">
                    {arr.map((p, i) => (
                      <li key={i} className="p-3 bg-zinc-50 rounded-xl border">
                        <div className="flex items-center gap-2 mb-1"><ImageIcon className="h-4 w-4"/><span className="font-medium">{p.label}</span><span className="text-xs text-zinc-500 ml-auto">{p.ratio}</span></div>
                        <div className="text-zinc-700 leading-relaxed">{p.text}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <footer className="border-t">
        <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-zinc-600">
          <div className="flex items-center gap-2"><Crown className="h-4 w-4"/> Micro‑Influencer Hub</div>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">Apply</a>
            <a href="#" className="hover:underline">Email</a>
            <a href="#" className="hover:underline">Instagram</a>
            <a href="#" className="hover:underline">TikTok</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
