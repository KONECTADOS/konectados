export function generateHTMLEmail(setup, price, name, fanNames, ramMemoryNames, ramMemorySizeInGb, hdNames, hdSizeInGb, ssdNames, ssdSizeInGb){
  return (
  `
  <style>
    .email{
      background: #141301; color: #fff; padding: 2rem; display: flex; flex-direction: column; align-items: center;
    }

    .email a{
      display: inline-block; padding: 1rem 0; width: 100%; color: #fff; background: #ef233c; text-decoration: none; font-size: 1rem; border-radius: .5rem; text-align: center; margin-top: 16px;
    }

    .table-kntc{
      margin-top: 32px; border-collapse: collapse; border-spacing: 0 .5rem; color: #fff;
    }

    .email h1{
      font-size: 44px; margin: 0;
    }
    .email p{
      font-size: 24px; margin: 0;
    }

    .email p.message{
      font-size: 1rem; color: #f8f0fb; opacity: .8;
    }

    .email span{
      
    }
    
    .table-kntc th{
      color: #fff; padding: 1rem; background: #272323;
    }
    
    .table-kntc td{
      color: #fff; padding: .75rem 1rem; border-bottom: 1px solid #272323;
        }

  </style>

    <div style="background: #141301; color: #fff; padding: 2rem;">
      <h1 style="font-size: 44px; margin: 0 auto; color: #fff;">Konectados</h1>
      <p style="font-size: 24px; margin: 0 auto; color: #fff;">Seu setup: <span style="font-weight: 500; font-size: 32px; color: #ef233c;">${
        new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(price)
      }</span></p>

      <p class="message">Logo entraremos em contato com você sobre como finalizar sua compra.<p>

      <table style="margin-top: 32px; border-collapse: collapse; border-spacing: 0 .5rem; color: #fff; width: 100%;">
        <thead>
          <tr>
            <th style="color: #fff; padding: 1rem; background: #272323;">Componentes</th>
            <th style="color: #fff; padding: 1rem; background: #272323;">Soquete</th>
            <th style="color: #fff; padding: 1rem; background: #272323;">Memória</th>
            <th style="color: #fff; padding: 1rem; background: #272323;">Preço</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="color: #fff; padding: .75rem 1rem; border-bottom: 1px solid #272323;">${setup.cpu.description}</td>
            <td style="color: #fff; padding: .75rem 1rem; border-bottom: 1px solid #272323;">${setup.cpu.cpuSocket}</td>
            <td style="color: #fff; padding: .75rem 1rem; border-bottom: 1px solid #272323;">-</td>
            <td style="color: #fff; padding: .75rem 1rem; border-bottom: 1px solid #272323;">${
              new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(setup.cpu.price)                
            }</td>
          </tr>
          <tr>
            <td style="color: #fff; padding: .75rem 1rem; border-bottom: 1px solid #272323;">${setup.motherboard.description}</td>
            <td style="color: #fff; padding: .75rem 1rem; border-bottom: 1px solid #272323;">${setup.motherboard.cpuSocket}</td>
            <td style="color: #fff; padding: .75rem 1rem; border-bottom: 1px solid #272323;">${setup.motherboard.ramSocket}</td>
            <td style="color: #fff; padding: .75rem 1rem; border-bottom: 1px solid #272323;">${
              new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(setup.motherboard.price)
            }</td>
          </tr>
          ${ setup.waterCooler.description !== 'skipped' ? (`
            <tr>
              <td style="color: #fff; padding: .75rem 1rem; border-bottom: 1px solid #272323;">${setup.waterCooler.description}</td>
              <td style="color: #fff; padding: .75rem 1rem; border-bottom: 1px solid #272323;">${setup.waterCooler.socketCompatibility?.join(', ')}</td>
              <td style="color: #fff; padding: .75rem 1rem; border-bottom: 1px solid #272323;">-</td>
              <td style="color: #fff; padding: .75rem 1rem; border-bottom: 1px solid #272323;">${
                new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(setup.waterCooler.price)
              }</td>
            </tr>
          `) : ''}
          <tr>
            <td style="color: #fff; padding: .75rem 1rem; border-bottom: 1px solid #272323;">${ramMemoryNames}</td>
            <td style="color: #fff; padding: .75rem 1rem; border-bottom: 1px solid #272323;">${setup.ramMemory.ListOfComponents[0].ramSocket}</td>
            <td style="color: #fff; padding: .75rem 1rem; border-bottom: 1px solid #272323;">${ramMemorySizeInGb} Gb</td>
            <td style="color: #fff; padding: .75rem 1rem; border-bottom: 1px solid #272323;">${
              new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(setup.ramMemory.price)
            }</td>
          </tr>
          <tr>
            <td style="color: #fff; padding: .75rem 1rem; border-bottom: 1px solid #272323;">${setup.graphicCard.description}</td>
            <td style="color: #fff; padding: .75rem 1rem; border-bottom: 1px solid #272323;">-</td>
            <td style="color: #fff; padding: .75rem 1rem; border-bottom: 1px solid #272323;">${setup.graphicCard.sizeInGb} Gb</td>
            <td style="color: #fff; padding: .75rem 1rem; border-bottom: 1px solid #272323;">${
              new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(setup.graphicCard.price)
            }</td>
          </tr>
          ${
            hdNames ?
            (
              `<tr>
                <td style="color: #fff; padding: .75rem 1rem; border-bottom: 1px solid #272323;">${hdNames}</td>
                <td style="color: #fff; padding: .75rem 1rem; border-bottom: 1px solid #272323;">-</td>
                <td style="color: #fff; padding: .75rem 1rem; border-bottom: 1px solid #272323;">${hdSizeInGb} Gb</td>
                <td style="color: #fff; padding: .75rem 1rem; border-bottom: 1px solid #272323;">${
                  new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(setup.hardDisk.price)
                }</td>
              </tr>`
            ) : ''
          }

          ${
            ssdNames ?
            (
              `
              <tr>
                <td style="color: #fff; padding: .75rem 1rem; border-bottom: 1px solid #272323;">${ssdNames}</td>
                <td style="color: #fff; padding: .75rem 1rem; border-bottom: 1px solid #272323;">-</td>
                <td style="color: #fff; padding: .75rem 1rem; border-bottom: 1px solid #272323;">${ssdSizeInGb} Gb</td>
                <td style="color: #fff; padding: .75rem 1rem; border-bottom: 1px solid #272323;">${
                  new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(setup.SSD.price)
                }</td>
              </tr>
              `
            ) : ''
          }
          <tr>
            <td style="color: #fff; padding: .75rem 1rem; border-bottom: 1px solid #272323;">${setup.powerSupply.description}</td>
            <td style="color: #fff; padding: .75rem 1rem; border-bottom: 1px solid #272323;">-</td>
            <td style="color: #fff; padding: .75rem 1rem; border-bottom: 1px solid #272323;">${setup.powerSupply.powerInWatts} W</td>
            <td style="color: #fff; padding: .75rem 1rem; border-bottom: 1px solid #272323;">${
              new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(setup.powerSupply.price)
            }</td>
          </tr>
          <tr>
            <td style="color: #fff; padding: .75rem 1rem; border-bottom: 1px solid #272323;">${setup.pcCabinet.description}</td>
            <td style="color: #fff; padding: .75rem 1rem; border-bottom: 1px solid #272323;">-</td>
            <td style="color: #fff; padding: .75rem 1rem; border-bottom: 1px solid #272323;">-</td>
            <td style="color: #fff; padding: .75rem 1rem; border-bottom: 1px solid #272323;">${
              new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(setup.pcCabinet.price)
            }</td>
          </tr>

          ${
            fanNames ? (
              `
              <tr>
                <td style="color: #fff; padding: .75rem 1rem; border-bottom: 1px solid #272323;">${fanNames}</td>
                <td style="color: #fff; padding: .75rem 1rem; border-bottom: 1px solid #272323;">-</td>
                <td style="color: #fff; padding: .75rem 1rem; border-bottom: 1px solid #272323;">-</td>
                <td style="color: #fff; padding: .75rem 1rem; border-bottom: 1px solid #272323;">${
                  new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(setup.fan.price)
                }</td>
              </tr>
              `
            ) : ''
          }
          ${
            setup.monitor?.description !== 'skipped' ? (
              `
              <tr>
                <td style="color: #fff; padding: .75rem 1rem; border-bottom: 1px solid #272323;">${setup.monitor.description}</td>
                <td style="color: #fff; padding: .75rem 1rem; border-bottom: 1px solid #272323;">-</td>
                <td style="color: #fff; padding: .75rem 1rem; border-bottom: 1px solid #272323;">-</td>
                <td style="color: #fff; padding: .75rem 1rem; border-bottom: 1px solid #272323;">${
                  new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(setup.monitor.price)
                }</td>
              </tr>
              `
            ) : ''
          }
        </tbody>
      </table>

      <a style="display: inline-block; padding: 1rem 0; width: 100%; color: #fff; background: #ef233c; text-decoration: none; font-size: 1rem; border-radius: .5rem; text-align: center; margin-top: 16px;" href="https://www.konectados.com.br/" target="_blank" rel="noreferrer">Visite nossa loja</a>
    </div>
  `
  );
}