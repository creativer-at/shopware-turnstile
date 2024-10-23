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
                            :value="currentValue.cloudFlareTurnstile.config.siteKey"
                            @input="updateSiteKey($event)"
                            name="cloudFlareTurnstileSiteKey"
                            :label="$tc('sw-settings-basic-information.captcha.label.cloudFlareTurnstileSiteKey')"
                        />
                    {% endblock %}

                    {% block sw_settings_captcha_select_v2_cloudflare_turnstile_secret_key %}
                        <sw-text-field
                            :value="currentValue.cloudFlareTurnstile.config.secretKey"
                            @input="updateSecretKey($event)"
                            name="cloudFlareTurnstileSecretKey"
                            :label="$tc('sw-settings-basic-information.captcha.label.cloudFlareTurnstileSecretKey')"
                        />
                    {% endblock %}
                </sw-container>
            {% endblock %}
        {% endblock %}
    `,

    data() {
        return {
            defaultConfig: {
                isActive: false,
                config: {
                    siteKey: '',
                    secretKey: ''
                }
            }
        };
    },

    created() {
        this.initializeTurnstileConfig();
    },

    methods: {
        initializeTurnstileConfig() {
            if (!this.currentValue.cloudFlareTurnstile) {
                this.$set(this.currentValue, 'cloudFlareTurnstile', { ...this.defaultConfig });
            } else if (!this.currentValue.cloudFlareTurnstile.config) {
                this.$set(this.currentValue.cloudFlareTurnstile, 'config', { ...this.defaultConfig.config });
            }
        },

        updateSiteKey(value) {
            this.$set(this.currentValue.cloudFlareTurnstile.config, 'siteKey', value);
            this.updateCaptchaConfig();
        },

        updateSecretKey(value) {
            this.$set(this.currentValue.cloudFlareTurnstile.config, 'secretKey', value);
            this.updateCaptchaConfig();
        },

        updateCaptchaConfig() {
            this.$emit('config-update', this.currentValue);
        }
    },

    watch: {
        'currentValue.cloudFlareTurnstile.config': {
            deep: true,
            handler(newVal) {
                console.debug('Turnstile config updated:', newVal);
            }
        }
    }
});