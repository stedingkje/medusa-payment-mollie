import { TransactionBaseService } from "@medusajs/medusa";
import { EntityManager } from "typeorm";

class MolliePaymentService extends TransactionBaseService {
  protected manager_: EntityManager;
  protected transactionManager_: EntityManager;
  protected apiKey_: string;

  constructor(container, options) {
    super(container);
    this.apiKey_ = options.apiKey;
  }
}
export default MolliePaymentService;
