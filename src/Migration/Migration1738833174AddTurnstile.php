<?php declare(strict_types=1);

namespace Creativer\Turnstile\Migration;

use Doctrine\DBAL\Connection;
use Shopware\Core\Framework\Migration\MigrationStep;

/**
 * @internal
 */
class Migration1738833174AddTurnstile extends MigrationStep
{
  private const CONFIG_KEY = "core.basicInformation.activeCaptchasV2";

  public function getCreationTimestamp(): int
  {
    return 1738833174;
  }

  public function update(Connection $connection): void
  {
    $json = $connection->fetchOne(
      "SELECT configuration_value FROM system_config WHERE configuration_key = :key",
      [
        "key" => self::CONFIG_KEY,
      ]
    );

    if (!$json) {
      return;
    }

    $config = json_decode($json);
    if (isset($config->_value->turnstile)) {
      return;
    }

    $config->_value->turnstile = [
      "name" => "turnstile",
      "isActive" => false,
    ];

    $connection->update(
      "system_config",
      [
        "configuration_value" => json_encode($config),
      ],
      [
        "configuration_key" => self::CONFIG_KEY,
      ]
    );
  }
}
