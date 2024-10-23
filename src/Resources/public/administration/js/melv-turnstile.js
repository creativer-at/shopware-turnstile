Shopware.Component.override('sw-settings-captcha-select-v2', {
    template: `
        {% block sw_settings_captcha_select_v2_google_recaptcha_v2 %}
            {% parent() %}
            {% block sw_settings_captcha_select_v2_cloudflare_turnstile %}
                <sw-container
                    v-if="currentValue.cloudFlareTurnstile && currentValue.cloudFlareTurnstile.isActive"
                    class="sw-settings-captcha-select-v2__cloudflare-turnstile"
                >
                    {% block sw_settings_captcha_select_v2_cloudflare_turnstile_description %}
                        <p class="sw-settings-captcha-select-v2__description">
                            {{ $tc('sw-settings-basic-information.captcha.label.cloudFlareTurnstileDescription') }}
                        </p>
                    {% endblock %}

                    {% block sw_settings_captcha_select_v2_cloudflare_turnstile_site_key %}
                        <sw-text-field
                            v-model="currentValue.cloudFlareTurnstile.config.siteKey"
                            name="cloudFlareTurnstileSiteKey"
                            :label="$tc('sw-settings-basic-information.captcha.label.cloudFlareTurnstileSiteKey')"
                        />
                    {% endblock %}

                    {% block sw_settings_captcha_select_v2_cloudflare_turnstile_secret_key %}
                        <sw-text-field
                            v-model="currentValue.cloudFlareTurnstile.config.secretKey"
                            name="cloudFlareTurnstileSecretKey"
                            :label="$tc('sw-settings-basic-information.captcha.label.cloudFlareTurnstileSecretKey')"
                        />
                    {% endblock %}
                </sw-container>
            {% endblock %}
        {% endblock %}
    `,

    created() {
        this.initConfig();
    },

    methods: {
        initConfig() {
            if (!this.currentValue.cloudFlareTurnstile) {
                this.$set(this.currentValue, 'cloudFlareTurnstile', {
                    isActive: false,
                    config: {
                        siteKey: '',
                        secretKey: ''
                    }
                });
            } else if (!this.currentValue.cloudFlareTurnstile.config) {
                this.$set(this.currentValue.cloudFlareTurnstile, 'config', {
                    siteKey: '',
                    secretKey: ''
                });
            }
        }
    },

    watch: {
        'currentValue.cloudFlareTurnstile.config': {
            deep: true,
            handler(newValue) {
                // Stellen Sie sicher, dass die Änderungen persistent sind
                this.$emit('input', this.currentValue);
                console.log('currentValue.cloudFlareTurnstile:', this.currentValue.cloudFlareTurnstile);
            }
        }
    }
});