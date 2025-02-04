<?php declare(strict_types=1);

namespace Creativer\Turnstile\Twig;

use Shopware\Core\Framework\Context;
use Shopware\Core\DevOps\Environment\EnvironmentHelper;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class Env extends AbstractExtension
{
  public function getFunctions()
  {
    return [new TwigFunction("env", [$this, "env"])];
  }

  public function env(string $name, $default = null): string
  {
    return (string) EnvironmentHelper::getVariable($name, $default);
  }
}
