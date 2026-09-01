// =========================================================
// FUNÇÕES AUXILIARES
// =========================================================

function dinheiro(valor) {
  return Number(valor || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function numero(valor) {
  return Number(valor || 0).toLocaleString("pt-BR", {
    maximumFractionDigits: 2,
  });
}

function media(valores) {
  if (valores.length === 0) {
    return 0;
  }

  let soma = 0;

  for (const valor of valores) {
    soma = soma + valor;
  }

  return soma / valores.length;
}

const registros = {
  1: [],
  2: [],
  3: [],
  4: [],
  5: [],
  6: [],
};

// =========================================================
// EXERCÍCIO 1 - FRETES
// =========================================================

function calcularFrete(dados) {
  let valorPorPeca;
  let nomeRegiao;

  if (dados.region === "1") {
    valorPorPeca = 1.2;
    nomeRegiao = "Sudeste";
  } else if (dados.region === "2") {
    valorPorPeca = 1.3;
    nomeRegiao = "Sul";
  } else if (dados.region === "3") {
    valorPorPeca = 1.5;
    nomeRegiao = "Centro-Oeste";
  } else {
    throw new Error("Região inválida");
  }

  const quantidade = Number(dados.qty);
  let custoPecas;

  if (quantidade <= 1000) {
    custoPecas = quantidade * valorPorPeca;
  } else {
    const primeirasMil = 1000 * valorPorPeca;
    const quantidadeRestante = quantidade - 1000;
    const valorComDesconto = valorPorPeca * 0.88;

    custoPecas = primeirasMil + quantidadeRestante * valorComDesconto;
  }

  const custoDistancia = Number(dados.distance) * Number(dados.fuel);
  let custoRastreamento = 0;

  if (dados.tracking === "S") {
    custoRastreamento = 200;
  }

  const total = custoPecas + custoDistancia + custoRastreamento;

  return {
    ...dados,
    regionName: nomeRegiao,
    total: total,
  };
}

// =========================================================
// EXERCÍCIO 2 - FOLHA DE PAGAMENTO
// =========================================================

function calcularSalario(dados) {
  let percentualHora;
  let nomeCategoria;

  if (dados.category === "F") {
    nomeCategoria = "Funcionário";

    if (dados.shift === "M") {
      percentualHora = 0.1;
    } else if (dados.shift === "V") {
      percentualHora = 0.15;
    } else {
      percentualHora = 0.2;
    }
  } else {
    nomeCategoria = "Gerente";

    if (dados.shift === "M") {
      percentualHora = 0.3;
    } else if (dados.shift === "V") {
      percentualHora = 0.35;
    } else {
      percentualHora = 0.4;
    }
  }

  let nomeTurno;

  if (dados.shift === "M") {
    nomeTurno = "Matutino";
  } else if (dados.shift === "V") {
    nomeTurno = "Vespertino";
  } else {
    nomeTurno = "Noturno";
  }

  const valorHora = Number(dados.minimum) * percentualHora;
  const salarioInicial = Number(dados.hours) * valorHora;
  let percentualAuxilio;

  if (salarioInicial <= 800) {
    percentualAuxilio = 0.25;
  } else if (salarioInicial <= 1200) {
    percentualAuxilio = 0.2;
  } else {
    percentualAuxilio = 0.15;
  }

  const avaliacao = Number(dados.rating);
  let percentualBonus = 0;

  if (avaliacao >= 9) {
    percentualBonus = 0.1;
  } else if (avaliacao >= 7) {
    percentualBonus = 0.05;
  } else if (avaliacao >= 5) {
    percentualBonus = 0.02;
  }

  const auxilio = salarioInicial * percentualAuxilio;
  const bonus = salarioInicial * percentualBonus;
  const salarioFinal = salarioInicial + auxilio + bonus;

  return {
    ...dados,
    categoryName: nomeCategoria,
    shiftName: nomeTurno,
    initial: salarioInicial,
    bonus: percentualBonus,
    total: salarioFinal,
  };
}

// =========================================================
// EXERCÍCIO 3 - PRODUÇÃO E ESTOQUE
// =========================================================

function calcularProducao(dados) {
  let nomeTipo;
  let multiplicador;

  if (dados.type === "1") {
    nomeTipo = "Padrão";
    multiplicador = 1;
  } else if (dados.type === "2") {
    nomeTipo = "Premium";
    multiplicador = 1.1;
  } else {
    nomeTipo = "Sob encomenda";
    multiplicador = 1.2;
  }

  const quantidade = Number(dados.qty);
  const custoUnitario = Number(dados.unit);
  const estoqueFinal = Number(dados.stock) + quantidade;
  const custoTotal = quantidade * custoUnitario * multiplicador;
  let alerta = "Normal";

  if (estoqueFinal > 5000) {
    alerta = "Alto";
  } else if (estoqueFinal < 500) {
    alerta = "Crítico";
  }

  return {
    ...dados,
    typeName: nomeTipo,
    final: estoqueFinal,
    total: custoTotal,
    alert: alerta,
  };
}

// =========================================================
// EXERCÍCIO 4 - RESERVAS DE HOTEL
// =========================================================

function calcularReserva(dados) {
  let nomeQuarto;
  let valorQuarto;

  if (dados.room === "S") {
    nomeQuarto = "Standard";
    valorQuarto = 1;
  } else if (dados.room === "L") {
    nomeQuarto = "Luxo";
    valorQuarto = 1.5;
  } else {
    nomeQuarto = "Premium";
    valorQuarto = 2;
  }

  let nomeTemporada;
  let valorTemporada;

  if (dados.season === "B") {
    nomeTemporada = "Baixa";
    valorTemporada = 1;
  } else if (dados.season === "A") {
    nomeTemporada = "Alta";
    valorTemporada = 1.25;
  } else {
    nomeTemporada = "Feriado";
    valorTemporada = 1.4;
  }

  const diarias = Number(dados.days);
  const hospedes = Number(dados.guests);
  const hospedagem =
    Number(dados.base) * valorQuarto * valorTemporada * diarias;
  let cafe = 0;

  if (dados.coffee === "S") {
    cafe = Number(dados.coffeeValue) * hospedes * diarias;
  }

  return {
    ...dados,
    roomName: nomeQuarto,
    seasonName: nomeTemporada,
    total: hospedagem + cafe,
    occupancy: diarias * hospedes,
  };
}

// =========================================================
// EXERCÍCIO 5 - TREINOS
// =========================================================

function calcularTreino(dados) {
  let nomeTreino;
  let multiplicador;

  if (dados.type === "F") {
    nomeTreino = "Físico";
    multiplicador = 1.5;
  } else if (dados.type === "T") {
    nomeTreino = "Técnico";
    multiplicador = 1.2;
  } else {
    nomeTreino = "Estratégico";
    multiplicador = 1;
  }

  let nomePosicao;

  if (dados.position === "G") {
    nomePosicao = "Goleiro";
  } else if (dados.position === "Z") {
    nomePosicao = "Zagueiro";
  } else if (dados.position === "M") {
    nomePosicao = "Meio-campo";
  } else {
    nomePosicao = "Atacante";
  }

  const duracao = Number(dados.duration);
  const intensidade = Number(dados.intensity);
  const carga = (duracao / 10) * intensidade * multiplicador;

  return {
    ...dados,
    typeName: nomeTreino,
    positionName: nomePosicao,
    load: carga,
  };
}

// =========================================================
// EXERCÍCIO 6 - VENDAS E COMISSÕES
// =========================================================

function calcularVenda(dados) {
  let nomeRegiao;
  let bonusRegiao;

  if (dados.region === "1") {
    nomeRegiao = "Norte";
    bonusRegiao = 0.01;
  } else if (dados.region === "2") {
    nomeRegiao = "Nordeste";
    bonusRegiao = 0.01;
  } else if (dados.region === "3") {
    nomeRegiao = "Sudeste";
    bonusRegiao = 0;
  } else {
    nomeRegiao = "Sul";
    bonusRegiao = 0.005;
  }

  let percentualCliente;

  if (dados.client === "PF") {
    percentualCliente = 0.02;
  } else {
    percentualCliente = 0.03;
  }

  const comissaoBase = Number(dados.commission) / 100;
  const percentualTotal = comissaoBase + percentualCliente + bonusRegiao;
  const valorComissao = Number(dados.value) * percentualTotal;

  return {
    ...dados,
    regionName: nomeRegiao,
    total: valorComissao,
  };
}

// =========================================================
// RELATÓRIOS
// =========================================================

function criarMetricas(quantidade, nome, valorMedio, maior, menor) {
  return `
    <div class="metrics">
      <div class="metric">
        <small>Total</small>
        <strong>${quantidade} ${nome}</strong>
      </div>
      <div class="metric">
        <small>Média</small>
        <strong>${dinheiro(valorMedio)}</strong>
      </div>
      <div class="metric">
        <small>Destaques</small>
        <strong>${maior} / ${menor}</strong>
      </div>
    </div>
  `;
}

function criarResumo(itens) {
  let html = '<div class="summary-list">';

  for (const item of itens) {
    html += `
      <div class="summary-row">
        <span>${item[0]}</span>
        <strong>${item[1]}</strong>
      </div>
    `;
  }

  html += "</div>";
  return html;
}

function relatorioBasico(lista, nome, itensExtras) {
  let soma = 0;
  let maior = lista[0];
  let menor = lista[0];

  for (const item of lista) {
    soma += item.total;

    if (item.total > maior.total) {
      maior = item;
    }

    if (item.total < menor.total) {
      menor = item;
    }
  }

  const resumo = [
    ["Maior valor", `${maior.code} · ${dinheiro(maior.total)}`],
    ["Menor valor", `${menor.code} · ${dinheiro(menor.total)}`],
  ];

  for (const item of itensExtras) {
    resumo.push(item);
  }

  if (lista.length !== 1) {
    nome += "s";
  }

  return (
    criarMetricas(
      lista.length,
      nome,
      soma / lista.length,
      maior.code,
      menor.code,
    ) + criarResumo(resumo)
  );
}

function relatorioFretes(lista) {
  let sudeste = 0;
  let sul = 0;
  let centroOeste = 0;

  for (const pedido of lista) {
    if (pedido.regionName === "Sudeste") {
      sudeste += pedido.total;
    } else if (pedido.regionName === "Sul") {
      sul += pedido.total;
    } else {
      centroOeste += pedido.total;
    }
  }

  return relatorioBasico(lista, "pedido", [
    ["Sudeste", dinheiro(sudeste)],
    ["Sul", dinheiro(sul)],
    ["Centro-Oeste", dinheiro(centroOeste)],
  ]);
}

function relatorioSalarios(lista) {
  const funcionarios = [];
  const gerentes = [];
  let bonusDez = 0;
  let bonusCinco = 0;
  let bonusDois = 0;
  let semBonus = 0;

  for (const pessoa of lista) {
    if (pessoa.category === "F") {
      funcionarios.push(pessoa.total);
    } else {
      gerentes.push(pessoa.total);
    }

    if (pessoa.bonus === 0.1) {
      bonusDez++;
    } else if (pessoa.bonus === 0.05) {
      bonusCinco++;
    } else if (pessoa.bonus === 0.02) {
      bonusDois++;
    } else {
      semBonus++;
    }
  }

  return relatorioBasico(lista, "funcionário", [
    ["Média — funcionários", dinheiro(media(funcionarios))],
    ["Média — gerentes", dinheiro(media(gerentes))],
    ["Bônus de 10%", bonusDez],
    ["Bônus de 5%", bonusCinco],
    ["Bônus de 2%", bonusDois],
    ["Sem bônus", semBonus],
  ]);
}

function relatorioProducao(lista) {
  let padrao = 0;
  let premium = 0;
  let encomenda = 0;
  let altos = 0;
  let criticos = 0;

  for (const ordem of lista) {
    if (ordem.type === "1") {
      padrao += ordem.final;
    } else if (ordem.type === "2") {
      premium += ordem.final;
    } else {
      encomenda += ordem.final;
    }

    if (ordem.alert === "Alto") {
      altos++;
    } else if (ordem.alert === "Crítico") {
      criticos++;
    }
  }

  return relatorioBasico(lista, "ordem", [
    ["Estoque — Padrão", numero(padrao)],
    ["Estoque — Premium", numero(premium)],
    ["Estoque — Sob encomenda", numero(encomenda)],
    ["Alertas altos", altos],
    ["Alertas críticos", criticos],
  ]);
}

function relatorioReservas(lista) {
  let comCafe = 0;
  let semCafe = 0;
  let ocupacao = 0;
  let soma = 0;

  for (const reserva of lista) {
    soma += reserva.total;
    ocupacao += reserva.occupancy;

    if (reserva.coffee === "S") {
      comCafe++;
    } else {
      semCafe++;
    }
  }

  return relatorioBasico(lista, "reserva", [
    ["Com café", comCafe],
    ["Sem café", semCafe],
    ["Ocupação total", `${numero(ocupacao)} hóspede-diárias`],
    ["Média por hóspede", dinheiro(soma / ocupacao)],
  ]);
}

function relatorioTreinos(lista) {
  const cargasPorJogador = {};
  const quantidades = {};

  for (const treino of lista) {
    if (!cargasPorJogador[treino.player]) {
      cargasPorJogador[treino.player] = 0;
      quantidades[treino.player] = 0;
    }

    cargasPorJogador[treino.player] += treino.load;
    quantidades[treino.player]++;
  }

  let maiorJogador = "";
  let menorJogador = "";
  let maiorCarga = -1;
  let menorCarga = Infinity;
  let emRisco = 0;
  const limite = Number(lista[0].maximum);
  const resumo = [];

  for (const jogador in cargasPorJogador) {
    const carga = cargasPorJogador[jogador];

    if (carga > maiorCarga) {
      maiorCarga = carga;
      maiorJogador = jogador;
    }

    if (carga < menorCarga) {
      menorCarga = carga;
      menorJogador = jogador;
    }

    let texto = `${numero(carga)} pts · ${quantidades[jogador]} treino(s)`;

    if (carga > limite) {
      emRisco++;
      texto += " · RISCO";
    }

    resumo.push([jogador, texto]);
  }

  resumo.unshift(["Jogadores em risco", emRisco]);
  resumo.unshift(["Jogador com menor carga", menorJogador]);
  resumo.unshift(["Jogador com maior carga", maiorJogador]);

  const cargas = [];

  for (const treino of lista) {
    cargas.push(treino.load);
  }

  return (
    criarMetricas(
      lista.length,
      "treinos",
      media(cargas),
      maiorJogador,
      menorJogador,
    ) + criarResumo(resumo)
  );
}

function relatorioVendas(lista) {
  const vendasPorVendedor = {};
  const comissoesPorVendedor = {};
  let totalPf = 0;
  let totalPj = 0;

  for (const venda of lista) {
    if (!vendasPorVendedor[venda.seller]) {
      vendasPorVendedor[venda.seller] = 0;
      comissoesPorVendedor[venda.seller] = 0;
    }

    vendasPorVendedor[venda.seller] += Number(venda.value);
    comissoesPorVendedor[venda.seller] += venda.total;

    if (venda.client === "PF") {
      totalPf += Number(venda.value);
    } else {
      totalPj += Number(venda.value);
    }
  }

  let melhorVendedor = "";
  let melhorComissao = "";
  let maiorVenda = -1;
  let maiorValorComissao = -1;
  let atingiramMeta = 0;
  const meta = Number(lista[0].goal);

  for (const vendedor in vendasPorVendedor) {
    if (vendasPorVendedor[vendedor] > maiorVenda) {
      maiorVenda = vendasPorVendedor[vendedor];
      melhorVendedor = vendedor;
    }

    if (comissoesPorVendedor[vendedor] > maiorValorComissao) {
      maiorValorComissao = comissoesPorVendedor[vendedor];
      melhorComissao = vendedor;
    }

    if (vendasPorVendedor[vendedor] >= meta) {
      atingiramMeta++;
    }
  }

  const comissoes = [];

  for (const venda of lista) {
    comissoes.push(venda.total);
  }

  return (
    criarMetricas(
      lista.length,
      "vendas",
      media(comissoes),
      melhorVendedor,
      melhorComissao,
    ) +
    criarResumo([
      [
        "Vendedor com mais vendas",
        `${melhorVendedor} · ${dinheiro(maiorVenda)}`,
      ],
      [
        "Vendedor com maior comissão",
        `${melhorComissao} · ${dinheiro(maiorValorComissao)}`,
      ],
      ["Vendedores que bateram a meta", atingiramMeta],
      ["Vendas PF", dinheiro(totalPf)],
      ["Vendas PJ", dinheiro(totalPj)],
    ])
  );
}

// =========================================================
// CONFIGURAÇÃO DOS EXERCÍCIOS
// =========================================================

function campo(nome, rotulo, tipo, opcoes, atributos) {
  return {
    nome: nome,
    rotulo: rotulo,
    tipo: tipo || "number",
    opcoes: opcoes || [],
    atributos: atributos || "",
  };
}

const exercicios = {
  1: {
    titulo: "Fretes e múltiplos pedidos",
    descricao:
      "Cadastre pedidos, calcule frete por região, distância, rastreamento e desconto por quantidade.",
    configuracao: [
      campo(
        "fuel",
        "Preço do combustível (R$)",
        "number",
        [],
        'step="0.01" min="0.01"',
      ),
    ],
    campos: [
      campo("code", "Código do pedido", "text"),
      campo("region", "Região", "select", [
        ["1", "Sudeste — R$ 1,20/peça"],
        ["2", "Sul — R$ 1,30/peça"],
        ["3", "Centro-Oeste — R$ 1,50/peça"],
      ]),
      campo("distance", "Distância (km)", "number", [], 'min="0"'),
      campo("qty", "Quantidade de peças", "number", [], 'min="1" step="1"'),
      campo("tracking", "Rastreamento", "select", [
        ["S", "Sim — R$ 200"],
        ["N", "Não"],
      ]),
    ],
    calcular: calcularFrete,
    relatorio: relatorioFretes,
    linha: function (item) {
      return [item.code, item.regionName, dinheiro(item.total)];
    },
  },
  2: {
    titulo: "Folha de pagamento",
    descricao:
      "Calcule salários, auxílio-alimentação e bônus de desempenho para funcionários e gerentes.",
    configuracao: [
      campo(
        "minimum",
        "Salário mínimo atual (R$)",
        "number",
        [],
        'step="0.01" min="0.01"',
      ),
    ],
    campos: [
      campo("code", "Código do funcionário", "text"),
      campo("hours", "Horas trabalhadas", "number", [], 'min="0"'),
      campo("category", "Categoria", "select", [
        ["F", "Funcionário operacional"],
        ["G", "Gerente"],
      ]),
      campo("shift", "Turno", "select", [
        ["M", "Matutino"],
        ["V", "Vespertino"],
        ["N", "Noturno"],
      ]),
      campo(
        "rating",
        "Avaliação (0 a 10)",
        "number",
        [],
        'min="0" max="10" step="0.1"',
      ),
    ],
    calcular: calcularSalario,
    relatorio: relatorioSalarios,
    linha: function (item) {
      return [
        item.code,
        `${item.categoryName} · ${item.shiftName}`,
        dinheiro(item.total),
      ];
    },
  },
  3: {
    titulo: "Controle de produção e estoque",
    descricao:
      "Gerencie ordens de produção, custos ajustados, estoque consolidado e alertas.",
    configuracao: [],
    campos: [
      campo("code", "Código da ordem", "text"),
      campo("product", "Código do produto", "text"),
      campo("type", "Tipo do produto", "select", [
        ["1", "Padrão"],
        ["2", "Premium"],
        ["3", "Sob encomenda"],
      ]),
      campo("qty", "Quantidade produzida", "number", [], 'min="1"'),
      campo("unit", "Custo unitário (R$)", "number", [], 'min="0" step="0.01"'),
      campo("stock", "Estoque inicial", "number", [], 'min="0"'),
    ],
    calcular: calcularProducao,
    relatorio: relatorioProducao,
    linha: function (item) {
      return [
        item.code,
        `${item.product} · ${item.typeName}`,
        `${dinheiro(item.total)} · ${item.alert}`,
      ];
    },
  },
  4: {
    titulo: "Reservas de hotel",
    descricao:
      "Aplique tarifas dinâmicas por quarto e temporada, incluindo café da manhã e ocupação.",
    configuracao: [
      campo(
        "base",
        "Diária padrão (R$)",
        "number",
        [],
        'min="0.01" step="0.01"',
      ),
      campo(
        "coffeeValue",
        "Café por hóspede/dia (R$)",
        "number",
        [],
        'min="0" step="0.01"',
      ),
    ],
    campos: [
      campo("code", "Código da reserva", "text"),
      campo("room", "Tipo do quarto", "select", [
        ["S", "Standard"],
        ["L", "Luxo"],
        ["P", "Premium"],
      ]),
      campo("season", "Temporada", "select", [
        ["B", "Baixa"],
        ["A", "Alta"],
        ["F", "Feriado"],
      ]),
      campo("days", "Quantidade de diárias", "number", [], 'min="1"'),
      campo("guests", "Número de hóspedes", "number", [], 'min="1"'),
      campo("coffee", "Café da manhã", "select", [
        ["S", "Incluso"],
        ["N", "Não incluso"],
      ]),
    ],
    calcular: calcularReserva,
    relatorio: relatorioReservas,
    linha: function (item) {
      return [
        item.code,
        `${item.roomName} · ${item.seasonName}`,
        dinheiro(item.total),
      ];
    },
  },
  5: {
    titulo: "Treinos e risco de lesão",
    descricao:
      "Acompanhe carga semanal dos jogadores, tipos de treino, posições e risco de sobrecarga.",
    configuracao: [
      campo(
        "maximum",
        "Carga máxima semanal",
        "number",
        [],
        'min="1" step="0.1"',
      ),
    ],
    campos: [
      campo("code", "Código do treino", "text"),
      campo("player", "Nome do jogador", "text"),
      campo("position", "Posição", "select", [
        ["G", "Goleiro"],
        ["Z", "Zagueiro"],
        ["M", "Meio-campo"],
        ["A", "Atacante"],
      ]),
      campo("type", "Tipo de treino", "select", [
        ["F", "Físico"],
        ["T", "Técnico"],
        ["E", "Estratégico"],
      ]),
      campo("duration", "Duração (minutos)", "number", [], 'min="1"'),
      campo(
        "intensity",
        "Intensidade (1 a 10)",
        "number",
        [],
        'min="1" max="10" step="1"',
      ),
    ],
    calcular: calcularTreino,
    relatorio: relatorioTreinos,
    linha: function (item) {
      return [
        item.code,
        `${item.player} · ${item.typeName}`,
        `${numero(item.load)} pts`,
      ];
    },
  },
  6: {
    titulo: "Vendas, comissões e metas",
    descricao:
      "Registre vendas, calcule comissões e compare a performance por vendedor, região e cliente.",
    configuracao: [
      campo(
        "goal",
        "Meta mensal por vendedor (R$)",
        "number",
        [],
        'min="0" step="0.01"',
      ),
      campo(
        "commission",
        "Comissão base (%)",
        "number",
        [],
        'min="0" step="0.1"',
      ),
    ],
    campos: [
      campo("code", "Código da venda", "text"),
      campo("seller", "Código do vendedor", "text"),
      campo("region", "Região", "select", [
        ["1", "Norte"],
        ["2", "Nordeste"],
        ["3", "Sudeste"],
        ["4", "Sul"],
      ]),
      campo(
        "value",
        "Valor da venda (R$)",
        "number",
        [],
        'min="0.01" step="0.01"',
      ),
      campo("client", "Tipo de cliente", "select", [
        ["PF", "Pessoa Física"],
        ["PJ", "Pessoa Jurídica"],
      ]),
    ],
    calcular: calcularVenda,
    relatorio: relatorioVendas,
    linha: function (item) {
      return [
        item.code,
        `${item.seller} · ${item.regionName} · ${item.client}`,
        dinheiro(item.total),
      ];
    },
  },
};

// =========================================================
// CONTROLE DA PÁGINA
// =========================================================

function criarCampo(campoAtual) {
  if (campoAtual.tipo === "select") {
    let opcoes = '<option value="">Selecione</option>';

    for (const opcao of campoAtual.opcoes) {
      opcoes += `<option value="${opcao[0]}">${opcao[1]}</option>`;
    }

    return `
      <div class="field">
        <label for="${campoAtual.nome}">${campoAtual.rotulo}</label>
        <select id="${campoAtual.nome}" name="${campoAtual.nome}" required>
          ${opcoes}
        </select>
      </div>
    `;
  }

  return `
    <div class="field">
      <label for="${campoAtual.nome}">${campoAtual.rotulo}</label>
      <input
        id="${campoAtual.nome}"
        name="${campoAtual.nome}"
        type="${campoAtual.tipo}"
        ${campoAtual.atributos}
        required
      >
    </div>
  `;
}

function criarCampos(listaDeCampos) {
  let html = "";

  for (const campoAtual of listaDeCampos) {
    html += criarCampo(campoAtual);
  }

  return html;
}

function mostrarExercicio(id) {
  const exercicio = exercicios[id];
  const template = document.querySelector("#exercise-template");
  const copia = template.content.cloneNode(true);
  const secao = copia.querySelector(".exercise");

  secao.querySelector(".exercise-number").textContent =
    `Exercício ${String(id).padStart(2, "0")}`;
  secao.querySelector(".exercise-title").textContent = exercicio.titulo;
  secao.querySelector(".exercise-description").textContent =
    exercicio.descricao;

  const formulario = secao.querySelector(".record-form");
  let html = "";

  if (exercicio.configuracao.length > 0) {
    html += `
      <div class="config">
        <p class="config-title">Configuração inicial</p>
        <div class="fields">
          ${criarCampos(exercicio.configuracao)}
        </div>
      </div>
    `;
  }

  html += `
    <div class="fields">${criarCampos(exercicio.campos)}</div>
    <div class="actions">
      <button class="primary" type="submit">Cadastrar e calcular</button>
    </div>
    <p class="message" role="alert"></p>
  `;

  formulario.innerHTML = html;

  formulario.addEventListener("submit", function (evento) {
    cadastrar(evento, id, secao);
  });

  secao.querySelector(".clear-button").addEventListener("click", function () {
    registros[id] = [];
    formulario.reset();
    atualizar(id, secao);
  });

  document.querySelector("#app").replaceChildren(secao);
  atualizar(id, secao);
}

function cadastrar(evento, id, secao) {
  evento.preventDefault();

  const formulario = evento.currentTarget;
  const dados = Object.fromEntries(new FormData(formulario));
  const mensagem = secao.querySelector(".message");

  for (const item of registros[id]) {
    const codigoSalvo = item.code.trim().toLowerCase();
    const codigoNovo = dados.code.trim().toLowerCase();

    if (codigoSalvo === codigoNovo) {
      mensagem.textContent =
        "Este código já foi cadastrado. Informe um código único.";
      return;
    }
  }

  mensagem.textContent = "";

  const exercicio = exercicios[id];
  const resultado = exercicio.calcular(dados);
  registros[id].push(resultado);

  for (const campoAtual of exercicio.campos) {
    formulario.elements[campoAtual.nome].value = "";
  }

  atualizar(id, secao);
}

function atualizar(id, secao) {
  const lista = registros[id];
  const exercicio = exercicios[id];
  const contador = secao.querySelector(".counter");
  const relatorio = secao.querySelector(".report-content");
  const historico = secao.querySelector(".records-content");

  contador.textContent = `${lista.length} cadastrado${lista.length === 1 ? "" : "s"}`;

  if (lista.length === 0) {
    relatorio.className = "report-content empty";
    relatorio.textContent =
      "Cadastre o primeiro registro para gerar o relatório.";
    historico.className = "records-content empty";
    historico.textContent = "Nenhum registro cadastrado.";
    return;
  }

  relatorio.className = "report-content";
  relatorio.innerHTML = exercicio.relatorio(lista);
  historico.className = "records-content";
  historico.innerHTML = criarTabela(lista, exercicio);
}

function criarTabela(lista, exercicio) {
  let linhas = "";

  for (const item of lista) {
    const colunas = exercicio.linha(item);
    linhas += "<tr>";

    for (const coluna of colunas) {
      linhas += `<td>${coluna}</td>`;
    }

    linhas += "</tr>";
  }

  return `
    <table class="record-table">
      <thead>
        <tr>
          <th>Código</th>
          <th>Detalhes</th>
          <th>Resultado</th>
        </tr>
      </thead>
      <tbody>${linhas}</tbody>
    </table>
  `;
}

// Eventos de navegação entre os exercícios
const abas = document.querySelectorAll(".tab");

for (const aba of abas) {
  aba.addEventListener("click", function () {
    document.querySelector(".tab.active").classList.remove("active");
    aba.classList.add("active");
    mostrarExercicio(Number(aba.dataset.tab));
  });
}

mostrarExercicio(1);
