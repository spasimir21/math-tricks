import { Controller, ReactiveController } from '@uix';

@ReactiveController
class BotToggleController extends Controller<{}, {}, { vsBot: boolean }> {
  toggle() {
    this.shared.vsBot = !this.shared.vsBot;
  }
}

export { BotToggleController };
