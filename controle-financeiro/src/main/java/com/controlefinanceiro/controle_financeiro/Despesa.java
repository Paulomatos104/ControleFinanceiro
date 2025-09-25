package model;

import java.time.LocalDate;

public class Despesa {
    private String descricao;
    private double valor;
    private String categoria;
    private LocalDate data;

    public Despesa(String descricao, double valor, String categoria, LocalDate data) {
        this.descricao = descricao;
        this.valor = valor;
        this.categoria = categoria;
        this.data = data;
    }

    public String getDescricao() { return descricao; }
    public double getValor() { return valor; }
    public String getCategoria() { return categoria; }
    public LocalDate getData() { return data; }

    @Override
    public String toString() {
        return data + " - " + descricao + " (" + categoria + "): R$ " + valor;
    }
}
