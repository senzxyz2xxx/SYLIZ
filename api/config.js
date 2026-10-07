module.exports = (req, res) => {
  const url =
    process.env.SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    '';
  const key =
    process.env.SUPABASE_PUBLISHABLE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    '';

  // กันพลาด: ถ้าเผลอใส่ secret key จะไม่ส่งออก
  if (key.startsWith('sb_secret_')) {
    res.status(500).json({ error: 'Secret key detected. Use the publishable (anon) key only.' });
    return;
  }

  res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
  res.status(200).json({ url, key });
};
