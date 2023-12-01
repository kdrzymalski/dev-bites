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
    // kod celowo nie jest najpiękniejszy

    let unlocking: number = 0.0
    let pricePerMinute: number = 0.0
    if (scooterData[0] === "not_fast") {
      unlocking = scooterData[1] as number
      pricePerMinute = scooterData[2] as number
    } else {
      unlocking = scooterData[3] as number
      pricePerMinute = scooterData[4] as number
    }

    let chargeAmount: number
    let priceAmountClientMultiplicationFactor: number = 0.9
    if (clientWithImmediatePayment) {
      priceAmountClientMultiplicationFactor = 0.9
    } else {
      priceAmountClientMultiplicationFactor = 1
    }
    const price =
      unlocking +
      pricePerMinute * minutes * priceAmountClientMultiplicationFactor
    chargeAmount = Math.max(price - clientCredit, 0)
    this.chargeClient(clientId, chargeAmount)
    let needsToChargeBattery: boolean = false
    if (clientWithImmediatePayment) {
      immediateTransactionsCounter++
    }
    if (batteryLevel < 0.07) {
      needsToChargeBattery = true
    }
    let loyaltyPoints: number = 0
    if (minutes > 15 && minutes < 50) {
      loyaltyPoints = 4
      if (priceAmountClientMultiplicationFactor < 1) {
        loyaltyPoints = 2
      }
    }

    if (minutes >= 50 && chargeAmount > 30) {
      loyaltyPoints = 20
    }
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
}

class Position {
  private latitude: number
  private longitude: number
}
