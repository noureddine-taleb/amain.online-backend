<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Facture</title>
</head>
<style>
    .clearfix:after {
        content: "";
        display: table;
        clear: both;
    }

    a {
        color: #0087C3;
        text-decoration: none;
    }

    body {
        position: relative;
        width: 21cm;
        height: 29.7cm;
        margin: 0 auto;
        color: #555555;
        background: #FFFFFF;
        font-family: Arial, sans-serif;
        font-size: 14px;
        font-family: SourceSansPro;
    }

    header {
        padding: 10px;
        margin-bottom: 20px;
        border-bottom: 1px solid #AAAAAA;
        width: 85%;
    }

    #logo {
        float: left;
        margin-top: 8px;
    }

    #logo img {
        height: 70px;
    }

    #company {
        float: right;
        text-align: right;
    }


    #details {
        margin-bottom: 50px;
    }

    #client {
        padding-left: 6px;
        border-left: 6px solid #0087C3;
        float: left;
    }

    #client .to {
        color: #777777;
    }

    h2.name {
        font-size: 1.4em;
        font-weight: normal;
        margin: 0;
    }

    #invoice {
        float: right;
        text-align: right;
    }

    #invoice h1 {
        color: #0087C3;
        font-size: 2.4em;
        line-height: 1em;
        font-weight: normal;
        margin: 0 0 10px 0;
    }

    #invoice .date {
        font-size: 1.1em;
        color: #777777;
    }

    #thanks {
        font-size: 2em;
        margin-bottom: 50px;
    }

    #notices {
        padding-left: 6px;
        border-left: 6px solid #0087C3;
    }

    #notices .notice {
        font-size: 1.2em;
    }

    footer {
        color: #777777;
        width: 100%;
        height: 30px;
        position: absolute;
        bottom: 0;
        border-top: 1px solid #AAAAAA;
        padding: 8px 0;
        text-align: center;
    }

    #companyInfo{
        float: right;
        width: 50%;
    }
    table{
        width: 100%;
        border: none;
    }
    table, th, td {
        border: 0.5px solid black;
        border-collapse: collapse;
        text-align: center;
    }
    td {
        padding: 15px;
        text-align: left;
        text-align: center;
    }
    th{
        padding: 5px;
        text-align: left;
        text-align: center;
    }
</style>

<body>
<header class="clearfix" style="">
    <div id="logo">
        <img src="/assets/bill.svg">
    </div>
    <div id="companyInfo" style="margin-top: -15px;">
        <h5>AMAIN CONSORTIUM</h5>
        <div style="margin-top: -20px;font-family: Sans-serifs; font-size:11px; ">
            <div style="float: left;">
                Douar Amain
                Commune Assaki <br>
                Circle Taliouine <br>
                Taroudant, Maroc
            </div>
            <div style="float: right; margin-right: 0px;">
                (+212) 6 00 00 00 00 <br>
                contact@amain.ma<br>
                https://amain.ma/<br>
            </div>
        </div>
    </div>
</header>
<main style="width: 88%; margin-top: 50px;">
    <fieldset style="padding: 25px; line-height: 2.0em; font-size: 15px;" >
        <legend style="font-size: 25px;"><b>FACTURE</b></legend>
        <div style="">
            <div style="float: left; margin-right: 40px;">
                <span > <b>DATE</b> : <?=$data['date']?></span><br>
                <span style="margin-bottom: 5px;"> <b>DEADLINE</b> : <?=$data['deadline']?></span><br>
            </div>
            <div style="text-align: right;">
                <div style="text-align: left; margin-left: 275px;">
                    <span> <b>FACTURÉ À </b> : <?=$data['user_id']['name']?></span><br>
                    <span style="margin-bottom: 5px;"> <b>NUMERO</b> : <?=$data['id']?></span><br>
                </div>
            </div>
        </div>
    </fieldset>
    <br>
    <table>
        <tr>
            <th>X</th>
            <th>VALUE</th>
        </tr>
        <tr>
            <th>COUNTER N</th>
            <td><?=$data['']?></td>
        </tr>
        <tr>
            <th>ISSUE DATE</th>
            <td><?=$data['issue_date']?></td>
        </tr>
        <tr>
            <th>QUANTITY</th>
            <td><?=$data['weight']?></td>        
        </tr>
        <tr>
            <th>PRICE PER UNIT</th>
            <td><?=$data['project_id']['fees']?> dh</td>        
        </tr>
        <tr>
            <th>CONSUMPTION</th>
            <td><?=$data['consumption']?> dh</td>
        </tr>
        <tr>
            <th>FEES</th>
            <td><?=$data['fees']?> dh</td>        
        </tr>
        <tr>
            <th>LATENCY PENALTY</th>
            <td><?=$data['penalty']?> dh</td>        
        </tr>
        <tr>
            <th>TOTAL</th>
            <td><b><?=$data['total']?> dh</b></td>        
        </tr>
    </table>
</main>
<footer style="width: 85%;">
    Benefeciary Bank : CIH BANK *** N° compte : 000 000 0000000000000000 00
</footer>
</body>

</html>
