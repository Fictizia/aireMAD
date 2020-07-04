const { getStationDetails, getParameterDetails, getTechniqueDetails, getPeriodDetails, getDateDetails, getMesuramentStatus } = require('../../tasks/transformators/commons')

describe('getStationDetails behaviour', () => {
  test('Should recognize the station', () => {
    const stationCode = '029'
    expect(getStationDetails(stationCode)).toStrictEqual({
      id: 29,
      name: 'El Pardo'
    })
  })

  test('Should not recognize the station', () => {
    const unknownStationCode = '999'
    expect(getStationDetails(unknownStationCode)).toStrictEqual({
      id: 999,
      name: 'unknown'
    })
  })
})

describe('getParameterDetails behaviour', () => {
  test('Should recognize the paraemter', () => {
    const parameterCode = '09'
    expect(getParameterDetails(parameterCode)).toStrictEqual({
      parameter: 'Partículas en suspensión',
      abrebiation: 'PS25'
    })
  })

  test('Should not recognize the parameter', () => {
    const unknownParameterCode = '999'
    expect(getParameterDetails(unknownParameterCode)).toStrictEqual({})
  })
})

describe('getTechniqueDetails behaviour', () => {
  test('Should recognize the technique', () => {
    const parameterCode = '47'
    expect(getTechniqueDetails(parameterCode)).toStrictEqual('Microbalanza')
  })

  test('Should not recognize the technique', () => {
    const unknownTechniqueCode = '999'
    expect(getTechniqueDetails(unknownTechniqueCode)).toStrictEqual('unknown')
  })
})

describe('getPeriodDetails behaviour', () => {
  test('Should recognize the period', () => {
    const periodCode = '02'
    expect(getPeriodDetails(periodCode)).toStrictEqual('datos por hora')
  })

  test('Should not recognize the period', () => {
    const unknownPeriodCode = '999'
    expect(getPeriodDetails(unknownPeriodCode)).toStrictEqual('unknown')
  })
})

describe('getDateDetails behaviour', () => {
  test('Should return a valid date', () => {
    expect(getDateDetails('2020', '12', '31')).toStrictEqual('2020-12-31T00:00:00.000Z')
    expect(getDateDetails('2020', '07', '04')).toStrictEqual('2020-07-04T00:00:00.000Z')
    expect(getDateDetails('2020', '01', '01')).toStrictEqual('2020-01-01T00:00:00.000Z')
  })
})

describe('getMesuramentStatus behaviour', () => {
  test('Should recognize the period', () => {
    const statusCode = 'V'
    expect(getMesuramentStatus(statusCode)).toStrictEqual('verificado')
  })

  test('Should not recognize the period', () => {
    const unknownStatusCode = 'X'
    expect(getMesuramentStatus(unknownStatusCode)).toStrictEqual('unknown')
  })
})
