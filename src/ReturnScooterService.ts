class ReturnScooterService {
  returnScooter(
    clientId: number,
    scooterId: number,
    where: Position,
    minutes: number,
    batteryLevel: number,
    scooterData: any[],
    clientCredit: number,
    clientWithImmediatePayment: boolean,
    immediateTransactionsCounter: number,
  ): void {
    const calculatePriceMultiplicationFactor =
      this.calculatePriceMultiplicationFactor(clientWithImmediatePayment)

    const price = this.calculatePrice(
      scooterData,
      minutes,
      calculatePriceMultiplicationFactor,
    )

    const chargeAmount = this.clientChargerCalculator(price, clientCredit)
    this.chargeClient(clientId, chargeAmount)

    const needsToChargeBattery = this.batteryChecker(
      clientWithImmediatePayment,
      immediateTransactionsCounter,
      batteryLevel,
    )

    const loyaltyPoints = this.loyaltyPointsCalculator(
      immediateTransactionsCounter,
      chargeAmount,
      clientWithImmediatePayment,
    )

    this.saveInDatabase(
      loyaltyPoints,
      chargeAmount,
      needsToChargeBattery,
      immediateTransactionsCounter,
    )
  }

  private saveInDatabase(
    loyaltyPoints: number,
    chargeAmount: number,
    needsToChargeBattery: boolean,
    immediateTransactionsCounter: number,
  ): void {
    // zapis wszystkiego do bazy danych
  }

  private chargeClient(clientId: number, chargeAmount: number): void {
    // obciążenie karty kredytowej
  }

  private calculatePriceMultiplicationFactor(
    clientWithImmediatePayment: boolean,
  ): number {
    let priceAmountClientMultiplicationFactor: number = 0.9
    if (clientWithImmediatePayment) {
      priceAmountClientMultiplicationFactor = 0.9
    } else {
      priceAmountClientMultiplicationFactor = 1
    }

    return priceAmountClientMultiplicationFactor
  }

  private clientChargerCalculator(price: number, clientCredit: number): number {
    return Math.max(price - clientCredit, 0)
  }

  private batteryChecker(
    clientWithImmediatePayment: boolean,
    immediateTransactionsCounter: number,
    batteryLevel: number,
  ): boolean {
    let needsToChargeBattery: boolean = false
    if (clientWithImmediatePayment) {
      immediateTransactionsCounter++
    }
    if (batteryLevel < 0.07) {
      needsToChargeBattery = true
    }
    return needsToChargeBattery
  }

  private loyaltyPointsCalculator(
    minutes: number,
    chargeAmount: number,
    clientWithImmediatePayment: boolean,
  ) {
    let loyaltyPoints: number = 0
    if (minutes > 15 && minutes < 50) {
      loyaltyPoints = 4
      if (
        this.calculatePriceMultiplicationFactor(clientWithImmediatePayment) < 1
      ) {
        loyaltyPoints = 2
      }
    }

    if (minutes >= 50 && chargeAmount > 30) {
      loyaltyPoints = 20
    }
    return loyaltyPoints
  }
  private calculatePrice(
    scooterData: any[],
    minutes: number,
    priceAmountClientMultiplicationFactor: number,
  ): number {
    let unlocking: number = 0.0
    let pricePerMinute: number = 0.0
    if (scooterData[0] === "not_fast") {
      unlocking = scooterData[1] as number
      pricePerMinute = scooterData[2] as number
    } else {
      unlocking = scooterData[3] as number
      pricePerMinute = scooterData[4] as number
    }

    return (
      unlocking +
      pricePerMinute * minutes * priceAmountClientMultiplicationFactor
    )
  }
}

class Position {
  private latitude: number
  private longitude: number
}
