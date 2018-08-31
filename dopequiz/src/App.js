import React, { Component } from 'react'
import Button from '@material-ui/core/Button/'
import questions from './questions/questions.json'
import './css/main.css'

class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			data: questions,
			activeQuestionIndex: 0,
			result: {
				pigeon: {
					votes: 0,
					description: 'Orijentisani su na međuljudske odnose i ljude sa kojima su u komunikaciji. Oni misle da postoji više od jednog načina da se dođe do cilja. Voleli bi da aktivno učestvuju u odlučivanju o stvarima koje ih se tiču, međutim, često su veoma spori u donošenju odluka. Oni žele da pričaju о problemu i da bolje upoznaju učesnike u pregovaranju, pošto iznad svega vrednuju odnose sa drugim ljudima. Često ne umeju da kažu NE. Prioriteti drugih postaju i njihovi prioriteti. Potrebna im је sigurnost i nisu osobe koje se lako prihvataju rizika. Ne vole da pričaju u javnosti. Važno im је da ih drugi prihvate. Ovo је osoba kojoj је važan timski rad i osećanja saradnika. Da bi bili uspešniji u procesu pregovaranja, treba da budu asertivniji, da se više fokusiraju na ciljeve, a manje na odnose i da donose zaključke zasnovane na činjenicama, a ne na subjektivnim procenama. U procesu pregovaranja, postaju oni koji umiruju, trudeći se da sve strane budu zadovoljne.'
				},
				owl: {
					votes: 0,
					description: 'Misle da su veoma mudri. Detaljni su i sporo donose odluke, pošto obično tragaju za savršenim odgovorom/rešenjem. Misliocima je potrebna izvesnost, predvidivost i jasno definisana pravila. Za razliku od pregovarača koji zahtevaju, oni nisu skloni preuzimanju rizika. Mogli bi smo ih opisati kao savetodavce, objektivne i analitične. Ponekad su i veoma neodlučni, preterano ozbiljni i kruti. Mogli bi da poboljšaju komunikaciju sa drugima tako što ćе biti brži, bez dugog bavljenja beskonačnim detaljima. Treba da nauče da preuzimaju rizike, da se suočavaju sa konfliktom (umesto da ga izbegavaju) i da pokazuju više brige za druge. Ne priča puno. Uglavnom sluša. Postavlja pitanja. Reflektivan je. Potrebno mu je puno informacija kako bi doneo odluku. Voli da zna kako je ono o čemu pričate funkcionisalo za nekog drugog u prošlosti. Ne gestikulira, ne pokazuje previše facijalnih izraza. Miran je i tih.'
				},
				peacock: {
					votes: 0,
					description: 'Entuzijaste u stalnoj potrazi za uzbuđenjima, što često može da bude problematično za sam proces pregovaranja. Njima nije nikakav problem da prekinu proces pregovaranja i da se zabavljaju. Vole da im se drugi dive i da javno istupaju (bez obzira na to da li znaju ili ne temu o kojoj govore). Stvaraoci su, impulsivni i često donose odluke na prečac. Imaju moć ubeđivanja i veoma su optimistični. Kreativni su, imaju mnogo ideja, ali im je problem da ih realizuju. Uzbuđenje za njih predstavlja sam proces stvaranja ideja, kasnije izgube interesovanje za realizaciju. Lako menjaju prioritete. Ovo je ekstravertna osoba. Odmah će početi da Vam priča o svom biznisu ili načinu na koji je došao na mesto na kome se naiazi. Voli da vodi glavnu reč. Voli neobavezna, neformalna otvaranja sastanka. Kada su pod stresom, teže da promene temu. Ono što može da im pomogne u komunikaciji i pregovorima jeste da malo uspore i da stvarima pristupaju sa manje žara i entuzijazma.'
				},
				eagle: {
					votes: 0,
					description: 'Pragmatični, orijentisani na rezultat, takmičarski nastrojeni i veoma kompetentni. Oni preuzimaju vođstvo i vole da vide da su stvari obavljene. Veoma su verbalno fluentni. Odlično rešavaju probleme i u stanju su da preuzimaju i najveće rizike (iako ne razmišljaju da li su u stanju da izađu na kraj sa preuzetim rizicima). Umeju da budu veoma arogantni, dominantni, nepoverljivi prema drugima i brzopleti. Često su diktatorski raspoloženi i nemaju kapacitete da saslušaju druge. Vode računa o vremenu i žеlе brzo i jednostavno da reše problem. U procesu pregovaranja često se ponašaju kao u uličnoj borbi — ne vode računa o potrebama drugih.'
				},
			},
			haveQuestions: true,
			winnerIs: '',
			winnerDescription: [],
			cheater: false
		}
	}

	// Vote has been casted
	castVote = (event) => {
		// Vote count
		// Next Question > Last question?
		// if last question false get next question from que
		// if last question true calc winner

		// Get clicked element
		let clickedElement = event.target
		// Check if clicked has registered as a value if not get parent
		if (!clickedElement.value) {
			clickedElement = clickedElement.parentElement
		}
		// Get casted vote Yes/No value
		const voteButtonText = clickedElement.value

		// Get total number of questions
		const questionsCount = Object.keys(this.state.data.questions).length // production 76, testing 4

		// Get active question index
		const { activeQuestionIndex } = this.state

		// Get vote type
		const voteTypeId = this.state.data.questions[activeQuestionIndex].type

		// Assign points by checking if YES or NO button is clicked
		if (voteButtonText === 'Yes') {
			// Count up the vote
			this.voteCounter(voteTypeId)
			// Go to next question
		}

		// Go to next question
		this.nextQuestion(activeQuestionIndex, questionsCount)
	}

	// Next question
	nextQuestion = (activeQuestionIndex, questionsCount) => {
		// If there are remaining questions
		if (activeQuestionIndex < questionsCount - 1) {
			// Go to next question by incrementing activeQuestion
			this.setState( state => ({
				activeQuestionIndex: this.state.activeQuestionIndex + 1
			}))
		} else {
			// No more questions
			this.setState( state => ({
				haveQuestions: false
			}))

			// Who won?
			this.getWinner()
		}
	}

	// Add up points
	voteCounter = (voteTypeId) => {
		let voteTypeName = ''

		switch(voteTypeId) {
		case 1:
			voteTypeName = 'pigeon'
			break
		case 2:
			voteTypeName = 'owl'
			break
		case 3:
			voteTypeName = 'peacock'
			break
		default:
			voteTypeName = 'eagle'
		}

		// Increment vote to a specific vote type
		this.setState( state => ({
			...this.state,
			result: {
				...this.state.result,
				[voteTypeName]: {
					...this.state.result[voteTypeName],
					votes: this.state.result[voteTypeName].votes + 1
				}
			}
		}),
		newState => {
			this.getWinner()
		})
	}

	// Get winner
	getWinner = () => {
		// All winners
		let winnersAll = {}

		// Sorting winners
		let sortWinners = []

		// Promote winner
		let winner = ''

		// Winenr description
		let winnerDescription = []

		// ES6 sugar
		const { pigeon, owl, peacock, eagle } = this.state.result
		// Very simple IF to determine if the user answered 'No' to all questions
		if (pigeon.votes === 0 && owl.votes === 0 && peacock.votes === 0 && eagle.votes === 0) {
			// If all votes are zero
			winner = 'igrao prljavo'
			this.setState({
				cheater: true
			})
		} else {
			// Create object with all votes and vote types
			winnersAll = {
				golub: [pigeon.votes, pigeon.description],
				sova: [owl.votes, owl.description],
				paun: [peacock.votes, peacock.description],
				orao: [eagle.votes, eagle.description]
			}

			// Move all votes from object to array
			for (var keyType in winnersAll) {
				sortWinners.push([keyType, winnersAll[keyType]])
			}

			// Sort winners array
			sortWinners.sort((a, b) => {
				return b[1][0] - a[1][0]
			})

			if ( sortWinners[0][1][0] === sortWinners[1][1][0] && sortWinners[0][1][0] === sortWinners[2][1][0] && sortWinners[0][1][0] === sortWinners[3][1][0] ) {
				// 1st, 2nd, 3rd and 4th have the same number of votes!!!
				winner = 'za Lazu'
				this.setState({
					cheater: true
				})
			} else if ( sortWinners[0][1][0] === sortWinners[1][1][0] && sortWinners[0][1][0] === sortWinners[2][1][0] ) {
				// 1st, 2nd and 3rd have the same number of votes
				winner = `${sortWinners[0][0]}, ${sortWinners[1][0]} i ${sortWinners[2][0]}`
				this.setState({
					cheater: false
				})
				winnerDescription.push(
					{
						title: sortWinners[0][0],
						text: sortWinners[0][1][1],
					},
					{
						title: sortWinners[1][0],
						text: sortWinners[1][1][1],
					},
					{
						title: sortWinners[2][0],
						text: sortWinners[2][1][1],
					}
				)
			} else if ( sortWinners[0][1][0] === sortWinners[1][1][0] ) {
				// 1st and 2nd have the same number of votes
				winner = `${sortWinners[0][0]} i ${sortWinners[1][0]}`
				this.setState({
					cheater: false
				})
				winnerDescription.push(
					{
						title: sortWinners[0][0],
						text: sortWinners[0][1][1],
					},
					{
						title: sortWinners[1][0],
						text: sortWinners[1][1][1],
					}
				)
			} else {
				// There can be only one!
				winner = `${sortWinners[0][0]}`
				this.setState({
					cheater: false
				})
				winnerDescription.push(
					{
						title: sortWinners[0][0],
						text: sortWinners[0][1][1],
					}
				)
			}

		}
		// Set winner text
		this.setState( (state) => ( {
			winnerIs: winner,
			winnerDescription: winnerDescription
		} ) )
	}

	// Restart the quiz
	playAgain = () => {
		this.setState({
			activeQuestionIndex: 0,
			result: {
				pigeon: {
					votes: 0,
					description: 'Orijentisani su na međuljudske odnose i ljude sa kojima su u komunikaciji. Oni misle da postoji više od jednog načina da se dođe do cilja. Voleli bi da aktivno učestvuju u odlučivanju o stvarima koje ih se tiču, međutim, često su veoma spori u donošenju odluka. Oni žele da pričaju о problemu i da bolje upoznaju učesnike u pregovaranju, pošto iznad svega vrednuju odnose sa drugim ljudima. Često ne umeju da kažu NE. Prioriteti drugih postaju i njihovi prioriteti. Potrebna im је sigurnost i nisu osobe koje se lako prihvataju rizika. Ne vole da pričaju u javnosti. Važno im је da ih drugi prihvate. Ovo је osoba kojoj је važan timski rad i osećanja saradnika. Da bi bili uspešniji u procesu pregovaranja, treba da budu asertivniji, da se više fokusiraju na ciljeve, a manje na odnose i da donose zaključke zasnovane na činjenicama, a ne na subjektivnim procenama. U procesu pregovaranja, postaju oni koji umiruju, trudeći se da sve strane budu zadovoljne.'
				},
				owl: {
					votes: 0,
					description: 'Misle da su veoma mudri. Detaljni su i sporo donose odluke, pošto obično tragaju za savršenim odgovorom/rešenjem. Misliocima je potrebna izvesnost, predvidivost i jasno definisana pravila. Za razliku od pregovarača koji zahtevaju, oni nisu skloni preuzimanju rizika. Mogli bi smo ih opisati kao savetodavce, objektivne i analitične. Ponekad su i veoma neodlučni, preterano ozbiljni i kruti. Mogli bi da poboljšaju komunikaciju sa drugima tako što ćе biti brži, bez dugog bavljenja beskonačnim detaljima. Treba da nauče da preuzimaju rizike, da se suočavaju sa konfliktom (umesto da ga izbegavaju) i da pokazuju više brige za druge. Ne priča puno. Uglavnom sluša. Postavlja pitanja. Reflektivan je. Potrebno mu je puno informacija kako bi doneo odluku. Voli da zna kako je ono o čemu pričate funkcionisalo za nekog drugog u prošlosti. Ne gestikulira, ne pokazuje previše facijalnih izraza. Miran je i tih.'
				},
				peacock: {
					votes: 0,
					description: 'Entuzijaste u stalnoj potrazi za uzbuđenjima, što često može da bude problematično za sam proces pregovaranja. Njima nije nikakav problem da prekinu proces pregovaranja i da se zabavljaju. Vole da im se drugi dive i da javno istupaju (bez obzira na to da li znaju ili ne temu o kojoj govore). Stvaraoci su, impulsivni i često donose odluke na prečac. Imaju moć ubeđivanja i veoma su optimistični. Kreativni su, imaju mnogo ideja, ali im je problem da ih realizuju. Uzbuđenje za njih predstavlja sam proces stvaranja ideja, kasnije izgube interesovanje za realizaciju. Lako menjaju prioritete. Ovo je ekstravertna osoba. Odmah će početi da Vam priča o svom biznisu ili načinu na koji je došao na mesto na kome se naiazi. Voli da vodi glavnu reč. Voli neobavezna, neformalna otvaranja sastanka. Kada su pod stresom, teže da promene temu. Ono što može da im pomogne u komunikaciji i pregovorima jeste da malo uspore i da stvarima pristupaju sa manje žara i entuzijazma.'
				},
				eagle: {
					votes: 0,
					description: 'Pragmatični, orijentisani na rezultat, takmičarski nastrojeni i veoma kompetentni. Oni preuzimaju vođstvo i vole da vide da su stvari obavljene. Veoma su verbalno fluentni. Odlično rešavaju probleme i u stanju su da preuzimaju i najveće rizike (iako ne razmišljaju da li su u stanju da izađu na kraj sa preuzetim rizicima). Umeju da budu veoma arogantni, dominantni, nepoverljivi prema drugima i brzopleti. Često su diktatorski raspoloženi i nemaju kapacitete da saslušaju druge. Vode računa o vremenu i žеlе brzo i jednostavno da reše problem. U procesu pregovaranja često se ponašaju kao u uličnoj borbi — ne vode računa o potrebama drugih.'
				},
			},
			haveQuestions: true,
			winnerIs: '',
			winnerDescription: []
		})
	}

	render() {
		const { activeQuestionIndex, haveQuestions, winnerIs, winnerDescription, cheater } = this.state
		const questionNumberCurrent = activeQuestionIndex + 1
		const questionNumberSum = Object.keys(this.state.data.questions).length
		let showTextContent
		let labelDescription

		if (!cheater) {
			labelDescription = <h5 className='result-label'>Opis ličnosti</h5>
		}

		if (haveQuestions) {
			// Regular content
			showTextContent =
				<main className='question'>
					<div className='question-counter'>{ questionNumberCurrent } / { questionNumberSum }</div>
					<h2 className='question-text'>{ this.state.data.questions[activeQuestionIndex].question }</h2>
					<div className='question-answer'>
						<Button variant='raised' color='primary' size='large' value='Yes' onClick={ this.castVote }>Da</Button>
						<Button variant='raised' color='secondary' size='large' value='No' onClick={ this.castVote }>Ne</Button>
					</div>
				</main>
		} else {
			// Show the winner
			showTextContent =
				<main className='result'>
					<h2 className='result-answer'>Ti si <span>{ winnerIs }</span>!</h2>
					{ labelDescription }
					<ul className='result-description'>
						{
							winnerDescription.map( (element) => {
								const title = element.title
								const text = element.text

								return (
									<li key={ title }>
										<h3>{ title }</h3>
										<p>{ text }</p>
									</li>
								)
							})
						}
					</ul>
					<div className='result-repeat'>
						<Button color='secondary' onClick={ this.playAgain }><i className='material-icons'>replay</i>Probaj ispočetka</Button>
					</div>
				</main>
		}

		return (
			<div className="dope">
				<header>
					<h1>DOPE test <small>indikator ličnog ponašanja</small></h1>
				</header>
				{ showTextContent }
				<footer>&copy; 2018 Auxburgo | All rights reserved.</footer>
			</div>
		)
	}
}

export default App
