import { IRetryPolicy, RetryContext } from "@microsoft/signalr";

export class RetryForeverPolicy implements IRetryPolicy {
  
  private static retries: number[] = [
    2 * 1000,
    5 * 1000,
    10 * 1000,
    20 * 1000
  ];

  private static defaultRetry = 40 * 1000;

  nextRetryDelayInMilliseconds(retryContext: RetryContext): number | null {
    return RetryForeverPolicy.retries[retryContext.previousRetryCount] || RetryForeverPolicy.defaultRetry;
  }

}