# hmh - Quantas horas? (How many hours?)
<p align="center">
  <a href="../README.md">English</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="README.md">Português</a>&nbsp;&nbsp;&nbsp;
</p>

> Calcule horas usando espaços de tempo

[![Build Status][travis-image]][travis-url]

## Instalação

```console
npm install hmh
```

**Observação:** para instalar a versão anterior, quando todos os métodos retornavam apenas uma string, use:

```console
npm install hmh@1.0.5
```

## Documentação da API

### hmh.sum(value[, output])

Calcule as horas, somando os espaços de tempo.

#### value

Tipo: `String` ou `Array`

Value é um número que representa um espaço de tempo, que deve ter um _sufixo_ `h` (horas) ou `m` (minutos).
O _sufixo_ precisa estar colado no número.

> Quando digo `espaço de tempo`, eu quero dizer:
>  - 1 hora e 10 minutos = `1h 10m` ou `1h10m`
>  - 2 horas = `2h` ou `120m`
>  - Entendeu? xD

Você pode usar os espaços de tempo que desejar e não se preocupe com os espaços, pois eles serão ignorados:

```js
const hmh = require('hmh')
console.log(hmh.sum('10m 20m 30m 40m 50m').toString()) // '2h 30m'
console.log(hmh.sum('10h2m2h    5m').toString()) // '12h 7m'
```

Você também pode usar array
```js
console.log(hmh.sum(['10m', '   20m', ' 30m ', '40m', '50m']).toString()) // '2h 30m'
```

Viu? Os espaços entre os espaços de tempo são completamente ignorados =)

#### output

Tipo: `String` Padrão: `hours` Opções: `minutes`

O output é sempre exibido no melhor formato. Se não tiver `horas`, apenas os `minutos` serão exibidos.
Caso contrário, será mostrado em horas.

Mas você pode querer forçar a saída em `minutos`. Isso é fácil! Basta passar `minutes` como segundo parâmetro:

```js
const sum = hmh.sum('10m 20m 30m 40m', 'minutes')
console.log(sum.toString()) // '100m'
```

#### Retorno

Tipo: `Object`

Todos os métodos retornam um objeto, com as propriedades `h`,`m` e `isNegative`; e o método `toString()`:

```js
console.log(hmh.sum('1h 10m 20m 30m')) // { toString: [Function], h: 2, m: null, isNegative: false }
```

##### .h

Tipo: `Number` ou `null`

Esta propriedade retorna o número de **horas** no resultado:

```js
console.log(hmh.sum('1h 10m 20m 30m').h) // 2
```

##### .m

Tipo: `Number` ou `null`

Esta propriedade retorna o número de **minutos** no resultado:

```js
console.log(hmh.sum('1h 10m 30m').m) // 40
console.log(hmh.sum('1h 10m 20m 30m').m) // null
console.log(hmh.sum('1h 10m 20m 30m', 'minutes').m) // 120
```

##### .isNegative

Tipo: `Boolean`

Esta propriedade retorna se o resultado é negativo

```js
console.log(hmh.sub('1h 2h').isNegative) // true
console.log(hmh.sub('2h 1h').isNegative) // false
```

##### .toString()

Tipo: `Function` Retorno: `String`

Este método retorna uma String como resultado (é o mesmo que a primeira versão retornada):

```js
console.log(hmh.sum('1h 2h').toString()) // '3h'
console.log(hmh.sum('1h 2h', 'minutes').toString()) // '180m'
console.log(hmh.sum('1h 2h') + '') // '3h'
```

Veja o último `console.log`. Por padrão, JavaScript usa o método `toString()` quando o operador `+` é usado com strings =)

### hmh.sub(value[, output])

Calcule as horas, subtraindo os espaços de tempo.

As opções `value` e `output` são as mesmas do método `hmh.sum()`. A diferença é que este método subtrai espaços de tempo:

```js
console.log(hmh.sub('1h 20m').toString()) // '40m'
console.log(hmh.sub('3h 10m 1h').toString()) // '1h 50m'
```

Este método considera que todos os espaços de tempo devem ser subtraídos:

```js
console.log(hmh.sub('1h10m 10m').toString()) // 40m
```

O resultado `40m` é porque todos os espaços de tempo foram subtraídos:

```console
1h - 10m - 10m = 40m
```

Se você quiser subtrair `10m` de `1h10m`, primeiro você precisa converter `1h10m` em apenas um espaço de tempo. Neste caso, converta `1h10m` em minutos. Você pode fazer algo como:

```js
const minutes = hmh.sum('1h10m', 'minutes').toString()
console.log(hmh.sub([minutes, '10m']).toString()) // '1h'
```
Porque agora, `1h10m` é `70m`.

`70m - 10m = 60m = 1h`. Fácil? =)

### hmh.diff(firstValue, secondValue[, output])

Calcule a diferença entre dois espaços de tempo.

Algo como: _Quantas horas eu tenho entre 10h 15m am e 12h pm? _
A resposta é muito simples:

```js
console.log(hmh.diff('10h 15m', '12h').toString()) // '1h 45m'
```

Tcharam! :tada: :grin:

O `output` é o mesmo dos métodos acima;)

### hmh.div(value, divisor[, output])

Divide um espaço de tempo por um número passado no parâmetro `divisor`.

Exemplo: você tem `7h` disponíveis para terminar um trabalho e 4 dias para usar todas essas horas. 
**Quantas horas** você pode gastar por dia?

```js
console.log(hmh.div('7h', 4).toString()) // '1h 45m'
```

:dancer: :dancer:

E qual o `output`? O mesmo que os demais acima!

## Relacionados

[hmh-cli][hmh-cli-url]

## Licença

[MIT][license-url] &copy; Fernando Daciuk

[travis-image]: https://travis-ci.org/fdaciuk/hmh.svg?branch=master
[travis-url]: https://travis-ci.org/fdaciuk/hmh
[hmh-cli-url]: https://github.com/fdaciuk/hmh-cli
[license-url]: https://github.com/fdaciuk/licenses/blob/master/MIT-LICENSE.md
