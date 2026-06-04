source "https://rubygems.org"

# Mirrors the gems GitHub Pages runs in production, so `bundle exec jekyll serve`
# builds the site locally exactly as it will be published.
gem "github-pages", group: :jekyll_plugins

# Build local/CI roda via GitHub Actions (não pelo build padrão do Pages), o que
# permite plugins fora da allowlist do GitHub Pages. Este plugin preenche
# `page.last_modified_at` a partir da data do último commit que tocou o arquivo,
# alimentando o <lastmod> do sitemap.xml sem edição manual.
gem "jekyll-last-modified-at", "~> 1.3", group: :jekyll_plugins
