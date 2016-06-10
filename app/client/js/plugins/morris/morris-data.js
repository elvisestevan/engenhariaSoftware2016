// Morris.js Charts sample data for SB Admin template

$(function() {

    // Area Chart
    Morris.Area({
        element: 'morris-area-chart',
        data: [{
            period: '2015-01',
            totaltarefas: 53,
            tarefasconcluidas: 2
        }, {
            period: '2015-02',
            totaltarefas: 56,
            tarefasconcluidas: 12
        }, {
            period: '2015-03',
            totaltarefas: 59,
            tarefasconcluidas: 29
        }, {
            period: '2015-04',
            totaltarefas: 70,
            tarefasconcluidas: 56
        }, {
            period: '2015-05',
            totaltarefas: 80,
            tarefasconcluidas: 65
        }, {
            period: '2015-06',
            totaltarefas: 80,
            tarefasconcluidas: 76
        }],
        xkey: 'period',
        ykeys: ['tarefasconcluidas', 'totaltarefas'],
        labels: ['Tarefas Concluídas', 'Total Tarefas'],
        pointSize: 2,
        hideHover: 'auto',
        resize: true
    });

});
