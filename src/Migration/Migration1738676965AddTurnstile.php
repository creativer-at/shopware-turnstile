<?php declare(strict_types=1);

namespace Creativer\Turnstile\Migration;

use Doctrine\DBAL\Connection;
use Shopware\Core\Framework\Migration\MigrationStep;
use Shopware\Core\Defaults;

/**
 * @internal
 */
class Migration1738676965AddTurnstile extends MigrationStep
{
  private const CONFIG_KEY = "core.basicInformation.activeCaptchasV2";

  /// TODO: get this data from db
  private array $captchaItems = [
    "honeypot" => [
      "name" => "Honeypot",
      "isActive" => false,
    ],
    "basicCaptcha" => [
      "name" => "basicCaptcha",
      "isActive" => false,
    ],
    "googleReCaptchaV2" => [
      "name" => "googleReCaptchaV2",
      "isActive" => false,
      "config" => [
        "siteKey" => "",
        "secretKey" => "",
        "invisible" => false,
      ],
    ],
    "googleReCaptchaV3" => [
      "name" => "googleReCaptchaV3",
      "isActive" => false,
      "config" => [
        "siteKey" => "",
        "secretKey" => "",
        "thresholdScore" => 0.5,
      ],
    ],
    "turnstile" => [
      "name" => "turnstile",
      "isActive" => false,
    ],
  ];

  public function getCreationTimestamp(): int
  {
    return 1738676965;
  }

  public function update(Connection $connection): void
  {
    $configId = $connection->fetchOne(
      "SELECT id FROM system_config WHERE configuration_key = :key AND updated_at IS NULL",
      [
        "key" => self::CONFIG_KEY,
      ]
    );

    if (!$configId) {
      return;
    }

    $connection->update(
      "system_config",
      [
        "configuration_key" => self::CONFIG_KEY,
        "configuration_value" => json_encode(["_value" => $this->captchaItems]),
        "created_at" => (new \DateTime())->format(Defaults::STORAGE_DATE_TIME_FORMAT),
      ],
      [
        "id" => $configId,
      ]
    );
  }
}
