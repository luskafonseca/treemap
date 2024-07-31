<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Treemap</title>
    <style>
        .treemap {
            display: flex;
            flex-wrap: wrap;
            width: 100%;
            height: 100vh;
            background-color: #e0f7e9; /* Fundo verde claro */
            align-content: flex-start;
        }
        .categoria {
            display: flex;
            flex-wrap: wrap;
            box-sizing: border-box;
            border: 1px solid #000;
            background-color: #a5d6a7; /* Verde */
            width: 100%;
            height: 100%;
        }
        .subcategoria {
            box-sizing: border-box;
            border: 1px solid #000;
            display: flex;
            align-items: center;
            justify-content: center;
            width: calc(100% / 4); /* Aproximadamente 1/4 da largura do contêiner principal */
            height: calc(100% / 2); /* Aproximadamente 1/2 da altura do contêiner principal */
        }
        .categoria-nome {
            font-size: 16px;
            font-weight: bold;
            text-align: center;
            width: 100%;
        }
        .subcategoria-nome {
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="treemap">
        <?php
        function calcularCor($valor, $maxValor) {
            $intensidade = intval(255 * ($valor / $maxValor));
            return "rgb(0, $intensidade, 0)"; // Verde com intensidade variável
        }

        $dados = [
            [
                "nome" => "Categoria Única",
                "valor" => 100,
                "filhos" => [
                    ["nome" => "Subcategoria 1", "valor" => 30],
                    ["nome" => "Subcategoria 2", "valor" => 10],
                    ["nome" => "Subcategoria 3", "valor" => 20],
                    ["nome" => "Subcategoria 4", "valor" => 5],
                    ["nome" => "Subcategoria 5", "valor" => 5],
                    ["nome" => "Subcategoria 6", "valor" => 10],
                    ["nome" => "Subcategoria 7", "valor" => 10],
                    ["nome" => "Subcategoria 8", "valor" => 10]
                ]
            ]
        ];

        foreach ($dados as $categoria) {
            $valorTotalSubcategorias = array_sum(array_column($categoria['filhos'], 'valor'));

            echo "<div class='categoria'>";
            echo "<div class='categoria-nome'>{$categoria['nome']}</div>";

            foreach ($categoria['filhos'] as $subcategoria) {
                $valorSubcategoria = $subcategoria['valor'];
                $corSubcategoria = calcularCor($valorSubcategoria, $valorTotalSubcategorias);

                echo "<div class='subcategoria' style='background-color: {$corSubcategoria};'>";
                echo "<div class='subcategoria-nome'>{$subcategoria['nome']}</div>";
                echo "</div>";
            }

            echo "</div>";
        }
        ?>
    </div>
</body>
</html>
