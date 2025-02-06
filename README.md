## Shopware Turnstile

Forked from [SLINIcraftet204/MelvTurnstile](https://github.com/SLINIcraftet204/MelvTurnstile) and [MelvinAchterhuis/MelvTurnstile](https://github.com/MelvinAchterhuis/MelvTurnstile)

### Usage

Install

    cd custom/plugins
    git clone https://github.com/creativer-at/shopware-turnstile.git CreativerTurnstile

    cd -
    bin/console plugin:install --activate Turnstile

Update

    cd custom/plugins/CreativerTurnstile
    git pull

    cd -
    bin/console plugin:refresh
    bin/console plugin:update Turnstile

### Configuration

Add to `.env.local`

    TURNSTILE_SITE=<site-key>
    TURNSTILE_SECRET=<secret-key>
