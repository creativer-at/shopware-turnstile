<?php declare(strict_types=1);

namespace Creativer\Turnstile\Storefront\Framework\Captcha;

use GuzzleHttp\ClientInterface;
use Psr\Http\Client\ClientExceptionInterface;
use Symfony\Component\HttpFoundation\Request;
use Shopware\Core\Framework\Feature;
use Shopware\Storefront\Framework\Captcha\AbstractCaptcha;
use Shopware\Core\DevOps\Environment\EnvironmentHelper;

class Turnstile extends AbstractCaptcha
{
  public const CAPTCHA_NAME = "turnstile";
  public const CAPTCHA_REQUEST_PARAMETER = "cf-turnstile-response";
  private const CAPTCHA_VERIFY_ENDPOINT = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

  private ClientInterface $client;

  /**
   * @internal
   */
  public function __construct(ClientInterface $client)
  {
    $this->client = $client;
  }

  /**
   * {@inheritdoc}
   */
  public function isValid(Request $request, array $config): bool
  {
    if (!$request->get(self::CAPTCHA_REQUEST_PARAMETER)) {
      return false;
    }

    $secretKey = EnvironmentHelper::getVariable(
      "TURNSTILE_SECRET",
      "1x0000000000000000000000000000000AA"
    );

    try {
      $response = $this->client->request("POST", self::CAPTCHA_VERIFY_ENDPOINT, [
        "form_params" => [
          "secret" => $secretKey,
          "response" => $request->get(self::CAPTCHA_REQUEST_PARAMETER),
          "remoteip" => $request->getClientIp(),
        ],
      ]);

      $responseRaw = $response->getBody()->getContents();
      $response = json_decode($responseRaw, true);

      return $response && (bool) $response["success"];
    } catch (ClientExceptionInterface $exception) {
      return false;
    }
  }

  /**
   * {@inheritdoc}
   */
  public function getName(): string
  {
    return self::CAPTCHA_NAME;
  }
}
