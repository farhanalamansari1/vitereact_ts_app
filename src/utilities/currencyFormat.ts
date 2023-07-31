const Currency_formatter=new Intl.NumberFormat(undefined,{
    currency:"Pkr", style:"currency"
})

export default function currencyFormat(number:number) {
  return Currency_formatter.format(number)

}
