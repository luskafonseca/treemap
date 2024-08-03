// Configuração inicial do gráfico de treemap
var options = {
  series: [
      {
          data: [
              { x: 'INTC', y: 1.2 },
              { x: 'GS', y: 0.4 },
              { x: 'CVX', y: -1.4 },
              { x: 'GE', y: 2.7 },
              { x: 'CAT', y: -0.3 },
              { x: 'RTX', y: 5.1 },
              { x: 'CSGO', y: -2.3 },
              { x: 'JNJ', y: 2.1 },
              { x: 'PG', y: 0.3 },
              { x: 'TRV', y: 0.12 },
              { x: 'MMM', y: -2.31 },
              { x: 'NKE', y: 3.98 },
              { x: 'IYT', y: 1.67 }
          ]
      }
  ],
  legend: {
      show: false  // Oculta a legenda do gráfico
  },
  chart: {
      height: 500,
      type: 'treemap',
      events: {
          // Evento acionado ao selecionar um ponto de dados no gráfico
          dataPointSelection: function(event, chartContext, config) {
              // Obtém o ponto de dados selecionado usando o índice
              var selectedPoint = options.series[0].data[config.dataPointIndex];
              
              // Preenche os campos de entrada com os valores do ponto selecionado
              document.getElementById('newX').value = selectedPoint.x;
              document.getElementById('newY').value = selectedPoint.y;

              // Armazena o índice do ponto de dados selecionado para edição ou remoção
              document.getElementById('newX').dataset.index = config.dataPointIndex;
          }
      }
  },
  title: {
      text: 'Treemap - Demander'  // Título do gráfico
  },
  dataLabels: {
      enabled: true,
      style: {
          fontSize: '12px',  // Tamanho da fonte das etiquetas de dados
      },
      formatter: function (text, op) {
          // Formata o texto exibido nas etiquetas de dados
          return [text, op.value];
      },
      offsetY: -4  // Ajusta o deslocamento vertical das etiquetas
  },
  plotOptions: {
      treemap: {
          enableShades: true,  // Ativa o sombreamento nas cores
          shadeIntensity: 0.5,  // Intensidade do sombreamento
          reverseNegativeShade: true,  // Reverte a sombra para valores negativos
          colorScale: {
              ranges: [
                  {
                      from: -100,
                      to: 0,
                      color: '#CD363A'  // Cor para valores negativos
                  },
                  {
                      from: 0.001,
                      to: 100,
                      color: '#52B12C'  // Cor para valores positivos
                  }
              ]
          }
      }
  }
};

// Instancia o gráfico com as opções configuradas e o renderiza no elemento com id "chart"
var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();

// Função para adicionar um novo dado ao gráfico
function addData() {
  var x = document.getElementById("newX").value;  // Obtém o nome do novo dado
  var y = parseFloat(document.getElementById("newY").value);  // Obtém o valor do novo dado

  // Verifica se o nome e o valor são válidos
  if (x && !isNaN(y)) {
      // Adiciona o novo dado à lista de dados do gráfico
      options.series[0].data.push({ x: x, y: y });
      
      // Atualiza o gráfico para refletir as mudanças
      chart.updateOptions(options);

      // Limpa os campos de entrada
      clearInputs();
  }
}

// Função para editar um dado existente no gráfico
function editData() {
  var index = document.getElementById("newX").dataset.index;  // Obtém o índice do dado selecionado para edição
  var newX = document.getElementById("newX").value;  // Obtém o novo nome do dado
  var y = parseFloat(document.getElementById("newY").value);  // Obtém o novo valor do dado

  // Verifica se o índice é válido e se os novos valores são válidos
  if (index !== undefined && newX && !isNaN(y)) {
      // Atualiza o dado existente na lista de dados do gráfico
      options.series[0].data[index] = { x: newX, y: y };
      
      // Atualiza o gráfico para refletir as mudanças
      chart.updateOptions(options);

      // Limpa os campos de entrada
      clearInputs();
  }
}

// Função para remover um dado do gráfico
function removeData() {
  var index = document.getElementById("newX").dataset.index;  // Obtém o índice do dado selecionado para remoção

  // Verifica se o índice é válido
  if (index !== undefined) {
      // Remove o dado da lista de dados do gráfico
      options.series[0].data.splice(index, 1);
      
      // Atualiza o gráfico para refletir as mudanças
      chart.updateOptions(options);

      // Limpa os campos de entrada
      clearInputs();
  }
}

// Função para limpar os campos de entrada após uma operação
function clearInputs() {
  document.getElementById('newX').value = '';  // Limpa o campo de entrada do nome
  document.getElementById('newY').value = '';  // Limpa o campo de entrada do valor

  // Remove o índice armazenado no campo de entrada do nome
  delete document.getElementById('newX').dataset.index;
}
