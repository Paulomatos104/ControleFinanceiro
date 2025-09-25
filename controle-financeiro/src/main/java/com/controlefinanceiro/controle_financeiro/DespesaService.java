import java.util.ArrayList;
import java.util.List;
package service;

public class DespesaService {
    private List<Despesa> despesas = new ArrayList<>();

    public void adicionarDespesa(Despesa despesa) {
        despesas.add(despesa);
    }

    public void listarDespesas() {
        for (Despesa d : despesas) {
            System.out.println(d);
        }
    }

    public double calcularTotal() {
        return despesas.stream().mapToDouble(Despesa::getValor).sum();
    }
}