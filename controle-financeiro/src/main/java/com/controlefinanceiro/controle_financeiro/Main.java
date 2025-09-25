package com.controlefinanceiro.controle_financeiro;

import model.Despesa;
import service.DespesaService;
import java.time.LocalDate;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        DespesaService service = new DespesaService();
        int opcao;

        do {
            System.out.println("\n=== Controle de Despesas ===");
            System.out.println("1. Adicionar Despesa");
            System.out.println("2. Listar Despesas");
            System.out.println("3. Mostrar Total Gasto");
            System.out.println("0. Sair");
            System.out.print("Escolha: ");
            opcao = sc.nextInt();
            sc.nextLine();

            switch (opcao) {
                case 1:
                    System.out.print("Descrição: ");
                    String desc = sc.nextLine();
                    System.out.print("Valor: ");
                    double valor = sc.nextDouble();
                    sc.nextLine();
                    System.out.print("Categoria: ");
                    String cat = sc.nextLine();
                    service.adicionarDespesa(new Despesa(desc, valor, cat, LocalDate.now()));
                    break;

                case 2:
                    service.listarDespesas();
                    break;

                case 3:
                    System.out.println("Total gasto: R$ " + service.calcularTotal());
                    break;

                case 0:
                    System.out.println("Saindo...");
                    break;
            }
        } while (opcao != 0);

        sc.close();
    }
}
